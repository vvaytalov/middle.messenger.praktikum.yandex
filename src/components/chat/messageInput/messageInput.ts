import { compile } from '../../../utils/templator';
import { template } from './messageInput.tmpl';
import sendIcon from '../../../assets/img/message-arrow.svg';
import Block from '../../../modules/Block';
import Input from '../../input/input';
import Button from '../../button/button';
import defaultIcon from '../../../assets/img/attach.svg';
import { handleFormSubmit, validateForm } from '../../../utils/handleForm';

import './messageInput.css';

interface IMessageInput {
    onMessageSend: (formData: Record<string, string>) => void;
}

export default class MessageInput extends Block {
    constructor(props: IMessageInput) {
        super('div', {
            className: 'message-input',
            classNameForm: 'message-input__form',
            icon: defaultIcon,
            MessageInput: new Input({
                placeholder: 'Cообщение',
                classMix: 'message-input__input',
                name: 'message',
            }),
            SendButton: new Button({
                type: 'submit',
                icon: sendIcon,
                light: false,
            }),
            onMessageSend: props.onMessageSend,
            events: {
                submit: (evt: Event) => this.handleSubmit(evt),
            },
        });
        this.validate = this.validate.bind(this);
    }

    validate() {
        const formElement: HTMLFormElement | null =
            this.getContent().querySelector(`.${this.props.classNameForm}`);
        validateForm(formElement);
    }

    handleSubmit(evt: Event) {
        const formData = handleFormSubmit(evt);
        this.props.onMessageSend(formData);
    }

    render() {
        return compile(template, this.props);
    }
}
