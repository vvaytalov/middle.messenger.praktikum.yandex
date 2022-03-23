import Block from '../../modules/Block';
import { compile } from '../../modules/templator';
import {
    handleFormSubmit,
    registerFormElements,
    validateForm,
} from '../../utils/handleForm';
import { REGEX_TEXT, VALUE } from '../../utils/regEx';
import { template } from './newChat.tmpl';

import './newChat.css';

interface INewChatForm {
    onSubmit: (formData: Record<string, string>) => void;
}

export default class newChat extends Block {
    constructor(props: INewChatForm) {
        super('div', {
            className: 'new-chat-form',
            classNameForm: 'new-chat-form__form',
            onSubmit: props?.onSubmit,
            form: {
                fields: [
                    {
                        type: 'text',
                        name: 'title',
                        placeholder: 'Название',
                        validation: {
                            pattern: REGEX_TEXT,
                            maxlength: 60,
                            required: true,
                            'data-error': VALUE,
                        },
                        onInput: () => {},
                        onValidate: () => this.validate(),
                    },
                ],
                buttons: [
                    {
                        type: 'submit',
                        label: 'Создать',
                        color: 'primary',
                        onClick: () => {
                            this.validate();
                        },
                    },
                ],
            },
            events: {
                submit: (evt: Event) => this.handleSubmit(evt),
            },
        });

        registerFormElements(this.props);

        this.validate = this.validate.bind(this);
    }

    validate() {
        const formElement: HTMLFormElement | null =
            this.getContent().querySelector(`.${this.props.classNameForm}`);
        validateForm(formElement);
    }

    handleSubmit(evt: Event) {
        const formData = handleFormSubmit(evt);

        this.props.onSubmit(formData);
    }

    render() {
        return compile(template, this.props);
    }
}
