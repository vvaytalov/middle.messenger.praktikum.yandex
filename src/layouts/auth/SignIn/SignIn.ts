import Block from '../../../modules/Block';
import Button from '../../../components/button/button';
import Input from '../../../components/input/input';
import { template } from './SignIn.tmpl';
import { compile } from '../../../utils/templator';
import Link from '../../../components/link/link';
import validateForm from '../../../utils/valideteForm';
import {
    LOGIN_MSG,
    PASSWORD_MSG,
    REGEX_LOGIN,
    REGEX_PASSWORD,
} from '../../../utils/regEx';

import '../auth.css';
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
                        onInput: (value: string) =>
                            console.log('Login:', value),
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
                        onInput: (value: string) =>
                            console.log('Password:', value),
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

        this.props.Button = this.props.form.buttons.map(
            (button: any) => new Button(button)
        );
        this.props.Input = this.props.form.fields.map(
            (field: any) => new Input(field)
        );

        this.validate = this.validate.bind(this);
    }

    handleSubmit(evt: Event) {
        evt.preventDefault();
        const { elements } = evt.target as HTMLFormElement;
        const fields = Array.from(elements).filter(
            (el) => el.nodeName === 'INPUT'
        );
        const formData = fields.reduce(
            (acc: Record<string, string>, field: HTMLInputElement) => {
                acc[field.name] = field.value;
                return acc;
            },
            {}
        );
        console.log(formData);
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
