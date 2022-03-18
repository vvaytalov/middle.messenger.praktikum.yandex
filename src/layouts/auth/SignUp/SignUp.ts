import Link from '../../../components/link/link';
import Block from '../../../modules/Block';
import { template } from './SignUp.tmpl';
import { compile } from '../../../utils/templator';
import {
    handleFormSubmit,
    registerFormElements,
    validateForm,
} from '../../../utils/handleForm';
import {
    LOGIN_MSG,
    MAIL_MSG,
    NAME_MSG,
    PASSWORD_MSG,
    REGEX_EMAIL,
    REGEX_LOGIN,
    REGEX_NAME,
    REGEX_PASSWORD,
    REGEX_TEL,
    TEL_MSG,
} from '../../../utils/regEx';

import '../auth.css';
import AuthControllers from '../../../controllers/AuthControllers';
export default class SignUpPage extends Block {
    constructor() {
        super('main', {
            className: 'auth',
            title: 'Регистрация',
            returnLinkText: 'Войти',
            returnLink: './sign-in',
            Link: new Link({
                label: 'Войти',
                to: '/sign-in',
            }),
            form: {
                fields: [
                    {
                        type: 'email',
                        name: 'email',
                        placeholder: 'Почта',
                        id: 'email',
                        validation: {
                            pattern: REGEX_EMAIL,
                            minlength: 5,
                            maxlength: 50,
                            required: true,
                            'data-error': MAIL_MSG,
                        },
                        onInput: () => {},
                        onValidate: () => this.validate(),
                    },
                    {
                        type: 'text',
                        name: 'login',
                        placeholder: 'Логин',
                        id: 'login',
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
                        type: 'text',
                        name: 'first_name',
                        placeholder: 'Имя',
                        id: 'first_name',
                        validation: {
                            pattern: REGEX_NAME,
                            maxlength: 30,
                            required: true,
                            'data-error': NAME_MSG,
                        },
                        onInput: () => {},
                        onValidate: () => this.validate(),
                    },
                    {
                        type: 'text',
                        name: 'second_name',
                        placeholder: 'Фамилия',
                        id: 'second_name',
                        validation: {
                            pattern: REGEX_NAME,
                            maxlength: 30,
                            required: true,
                            'data-error': NAME_MSG,
                        },
                        onInput: () => {},
                        onValidate: () => this.validate(),
                    },
                    {
                        type: 'tel',
                        name: 'phone',
                        placeholder: 'Телефон',
                        id: 'tel',
                        validation: {
                            pattern: REGEX_TEL,
                            maxlength: 20,
                            required: true,
                            'data-error': TEL_MSG,
                        },
                        onInput: () => {},
                        onValidate: () => this.validate(),
                    },
                    {
                        type: 'password',
                        name: 'password',
                        placeholder: 'Пароль',
                        id: 'password',
                        validation: {
                            pattern: REGEX_PASSWORD,
                            maxlength: 40,
                            required: true,
                            'data-error': PASSWORD_MSG,
                        },
                        onInput: () => {
                            this.props.repeatedPasswordValidate();
                        },
                        onValidate: () => this.validate(),
                    },
                    {
                        type: 'password',
                        name: 'second_password',
                        placeholder: 'Повторите пароль',
                        id: 'second_password',
                        validation: {
                            required: true,
                        },
                        useValidation: (validate: () => void) => {
                            this.props.repeatedPasswordValidate = validate;
                        },
                        onInput: (value: string) => {
                            const password: HTMLInputElement | null =
                                this.getContent().querySelector(
                                    '[name=password]'
                                );
                            const SecondPassword: HTMLInputElement | null =
                                this.getContent().querySelector(
                                    '[name=second_password]'
                                );

                            if (!password || !SecondPassword) {
                                return;
                            }

                            if (password.value === value) {
                                SecondPassword.setCustomValidity('');
                                this.props.repeatedPasswordValidate();
                            } else {
                                SecondPassword.setCustomValidity(
                                    'Пароли не совпадают'
                                );
                                this.props.repeatedPasswordValidate();
                            }
                        },
                        onValidate: () => this.validate(),
                    },
                ],
                buttons: [
                    {
                        type: 'submit',
                        label: 'Зарегистрироваться',
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

        AuthControllers.SignUp({
            login: formData.login,
            email: formData.email,
            first_name: formData.first_name,
            second_name: formData.second_name,
            password: formData.password,
            phone: formData.phone,
        });
    }

    validate() {
        const formElement: HTMLFormElement | null =
            this.getContent().querySelector('.auth');
        validateForm(formElement);
    }

    render(): string | void {
        return compile(template, this.props);
    }
}
