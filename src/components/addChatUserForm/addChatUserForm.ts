import { template } from './addChatUserForm.tmpl';
import Block from '../../modules/Block';

import {
    handleFormSubmit,
    registerFormElements,
    validateForm,
} from '../../utils/handleForm';
import { compile } from '../../modules/templator';

import './addChatUserForm.css';

interface IAddChatUserForm {
    onSubmit: (formData: Record<string, string>) => void;
}

class AddChatUserForm extends Block {
    constructor(props: IAddChatUserForm) {
        super('div', {
            className: 'add-chat-user-form',
            classNameForm: 'add-chat-user-form__form',
            onSubmit: props?.onSubmit,
            form: {
                fields: [
                    {
                        type: 'search',
                        name: 'login',
                        placeholder: 'Поиск по логину',
                        validation: {
                            pattern: '[\\w.]*',
                            maxlength: 60,
                            autocomplete: 'off',
                            'data-error':
                                'Обязательно поле. Только англ. буквы, символ _ и точка',
                        },
                        onInput: () => {},
                        onValidate: () => this.validate(),
                    },
                ],
                buttons: [],
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

export default AddChatUserForm;
