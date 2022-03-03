import Block from '../../../modules/Block';
import Button from '../../../components/button/button';
import Input from '../../../components/input/input';
import { template } from './SignIn.tmpl';
import { compile } from '../../../utils/templator';
import Link from '../../../components/link/link';
import validateForm from '../../../utils/valideteForm';
import { REGEX_LOGIN, REGEX_PASSWORD } from '../../../utils/regEx';

import '../auth.css';
class SignInPage extends Block {
    constructor() {
        super('main', {
            className: 'auth',
            title: 'Вход',
            returnLinkText: 'Нет аккаунта?',
            returnLink: './sign-up.html',
            Link: new Link({
                field: [
                    {
                        label: 'Нет аккаунта ?',
                        link: '/sign-up.html',
                    },
                ],
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
                            'data-error': 'Англ. буквы, от 3 до 16 символов',
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
                            'data-error': 'Добавьте символы: !@#$%^&*',
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

document.body.prepend(new SignInPage().getContent());
