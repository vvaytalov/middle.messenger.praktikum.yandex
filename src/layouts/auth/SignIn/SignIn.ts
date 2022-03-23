import Block from '../../../modules/Block';
import { template } from './SignIn.tmpl';
import { compile } from '../../../modules/templator';
import Link from '../../../components/link/link';
import {
    handleFormSubmit,
    registerFormElements,
    validateForm,
} from '../../../utils/handleForm';
import {
    LOGIN_MSG,
    PASSWORD_MSG,
    REGEX_LOGIN,
    REGEX_PASSWORD,
} from '../../../utils/regEx';

import '../auth.css';
import AuthControllers from '../../../controllers/AuthControllers';
export default class SignInPage extends Block {
    constructor() {
        super('main', {
            className: 'auth',
            title: 'Вход',
            returnLinkText: 'Нет аккаунта?',
            returnLink: './sign-up',
            Link: new Link({
                label: 'Нет аккаунта ?',
                to: '/sign-up',
            }),
            form: {
                fields: [
                    {
                        type: 'text',
                        name: 'login',
                        placeholder: 'Логин',
                        validation: {
                            pattern: REGEX_LOGIN,
                            maxlength: 30,
                            required: true,
                            'data-error': LOGIN_MSG,
                        },
                        onInput: () => {},
                        onValidate: () => this.validate(),
                    },
                    {
                        type: 'password',
                        name: 'password',
                        placeholder: 'Пароль',
                        validation: {
                            pattern: REGEX_PASSWORD,
                            maxlength: 40,
                            required: true,
                            'data-error': PASSWORD_MSG,
                        },
                        onInput: () => {},
                        onValidate: () => this.validate(),
                    },
                ],
                buttons: [
                    {
                        type: 'submit',
                        label: 'Авторизация',
                        onClick: () => {
                            this.validate();
                        },
                    },
                ],
            },
            events: {
                submit: (event: Event) => this.handleSubmit(event),
            },
        });

        registerFormElements(this.props);

        this.validate = this.validate.bind(this);
    }

    handleSubmit(evt: Event) {
        const formData = handleFormSubmit(evt);

        AuthControllers.SignIn({
            login: formData.login,
            password: formData.password,
        });
    }

    validate() {
        const formElement: HTMLFormElement | null =
            this.getContent().querySelector('.auth');
        validateForm(formElement);
    }

    render() {
        return compile(template, this.props);
    }
}
