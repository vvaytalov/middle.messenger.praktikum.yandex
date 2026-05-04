import { compile } from '../../../modules/templator';
import { template } from './messageInput.tmpl';
import sendIcon from '../../../assets/img/message-arrow.svg';
import Block from '../../../modules/Block';
import { store } from '../../../store';
import Input from '../../input/input';
import Button from '../../button/button';
import defaultIcon from '../../../assets/img/attach.svg';
import { handleFormSubmit, validateForm } from '../../../utils/handleForm';
import {
    IMessageComposerState,
    MessageComposerMode,
} from '../../../types/models';
import {
    clearChatDraft,
    getChatDraft,
    saveChatDraft,
} from '../../../utils/chatDrafts';
import { getActiveChatId } from '../../../utils/chatSelectors';

import './messageInput.css';

interface IMessageSendPayload {
    message: string;
}

interface IMessageInput {
    chatId: number | null;
    composer: IMessageComposerState;
    onMessageSend: (payload: IMessageSendPayload) => void;
    onCancelComposer: () => void;
}

export default class MessageInput extends Block {
    constructor(props: IMessageInput) {
        const resizeDraftField = () => {
            const messageField = document.querySelector(
                '.message-input__input .input__field',
            ) as HTMLTextAreaElement | null;

            if (!messageField) {
                return;
            }

            messageField.style.height = 'auto';
            messageField.style.height = `${Math.min(messageField.scrollHeight, 160)}px`;
        };

        const messageField = new Input({
            placeholder: 'Сообщение',
            classMix: 'message-input__input',
            name: 'message',
            multiline: true,
            rows: 1,
            value: getChatDraft(props.chatId),
            onInput: (value) => {
                saveChatDraft(getActiveChatId(store.state), value);
                window.setTimeout(() => {
                    resizeDraftField();
                }, 0);
            },
        });

        super('div', {
            className: 'message-input',
            classNameForm: 'message-input__form',
            icon: defaultIcon,
            chatId: props.chatId,
            composer: props.composer,
            MessageInput: messageField,
            SendButton: new Button({
                type: 'submit',
                icon: sendIcon,
                light: false,
                classMix: 'button_round',
            }),
            CancelComposerButton: new Button({
                type: 'button',
                label: 'Отмена',
                light: true,
                classMix: 'message-input__composer-cancel',
                onClick: props.onCancelComposer,
            }),
            onMessageSend: props.onMessageSend,
            onCancelComposer: props.onCancelComposer,
            events: {
                submit: (evt: Event) => this.handleSubmit(evt),
                keydown: (evt: KeyboardEvent) => this.handleKeyDown(evt),
            },
        });
        this.validate = this.validate.bind(this);
        this.autoResize = this.autoResize.bind(this);
        this.loadDraft = this.loadDraft.bind(this);
    }

    validate() {
        const formElement: HTMLFormElement | null =
            this.getContent().querySelector(`.${this.props.classNameForm}`);
        validateForm(formElement);
    }

    componentDidMount() {
        this.loadDraft(this.props.chatId);
        this.autoResize();
    }

    componentDidUpdate() {
        const shouldRestoreFocus = this.isMessageFieldFocused();

        this.loadDraft(this.props.chatId);
        this.syncComposerValue();
        window.setTimeout(() => {
            if (shouldRestoreFocus) {
                this.focusMessageField();
            }
            this.autoResize();
        }, 0);
        return true;
    }

    private getComposerTitle(mode: MessageComposerMode) {
        if (mode === 'reply') {
            return 'Ответ';
        }

        if (mode === 'edit') {
            return 'Редактирование';
        }

        if (mode === 'forward') {
            return 'Пересылка';
        }

        return '';
    }

    private getMessageField() {
        return this.getContent().querySelector(
            '.message-input__input .input__field',
        ) as HTMLTextAreaElement | null;
    }

    private setMessageValue(value: string) {
        const messageField = this.getMessageField();

        if (messageField?.value === value) {
            return;
        }

        this.props.MessageInput.setProps({
            value,
        });
    }

    private isMessageFieldFocused() {
        const messageField = this.getMessageField();

        return Boolean(messageField && document.activeElement === messageField);
    }

    private focusMessageField() {
        const messageField = this.getMessageField();

        messageField?.focus({
            preventScroll: true,
        });
    }

    private autoResize() {
        const messageField = this.getMessageField();

        if (!messageField) {
            return;
        }

        messageField.style.height = 'auto';
        messageField.style.height = `${Math.min(messageField.scrollHeight, 160)}px`;
    }

    private loadDraft(chatId: number | null) {
        const draft = getChatDraft(chatId);

        this.setMessageValue(draft);
    }

    private syncComposerValue() {
        if (this.props.composer.mode !== 'edit' || !this.props.composer.target) {
            return;
        }

        this.setMessageValue(this.props.composer.target.content);
    }

    private handleKeyDown(evt: KeyboardEvent) {
        const target = evt.target as HTMLElement;

        if (
            !target.closest('.message-input__input .input__field') ||
            evt.key !== 'Enter'
        ) {
            return;
        }

        if (evt.shiftKey) {
            return;
        }

        evt.preventDefault();
        const formElement = this.getContent().querySelector(
            `.${this.props.classNameForm}`,
        ) as HTMLFormElement | null;

        formElement?.requestSubmit();
    }

    handleSubmit(evt: Event) {
        const formData = handleFormSubmit(evt);
        const typedMessage = formData.message?.trim();
        const message = typedMessage
            || (
                this.props.composer.mode === 'forward'
                && this.props.composer.target
                    ? this.props.composer.target.content
                    : ''
            );

        if (!message) {
            return;
        }

        clearChatDraft(this.props.chatId);
        this.props.MessageInput.setProps({
            value: '',
        });
        this.props.onMessageSend({
            message,
        });
        window.setTimeout(() => {
            this.focusMessageField();
            this.autoResize();
        }, 0);
    }

    render() {
        return compile(template, {
            ...this.props,
            composerActive: this.props.composer.mode === 'idle' ? 'false' : 'true',
            composerTitle: this.getComposerTitle(this.props.composer.mode),
            composerPreview: this.props.composer.target?.content || '',
        });
    }
}
