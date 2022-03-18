import Link from '../../../components/link/link';
import Block from '../../../modules/Block';
import avatarImage from '../../../assets/img/noavatar.svg';
import { compile } from '../../../utils/templator';
import { template } from './change_password.tmpl';

import '../profile.css';
import { PASSWORD_MSG, REGEX_PASSWORD } from '../../../utils/regEx';
import {
    validateForm,
    handleFormSubmit,
    registerFormElements,
} from '../../../utils/handleForm';
import backButton from '../../../components/backButton/backButton';

export default class ChangePassword extends Block {
    constructor() {
        super('main', {
            className: 'profile',
            title: '@vvaytalov',
            avatar: avatarImage,
            Link: new Link({
                label: 'В профиль',
                to: '/profile',
            }),
            LinkBack: new backButton({
                className: 'back',
            }),
            form: {
                fields: [
                    {
                        id: 'oldPassword',
                        placeholder: 'Старый пароль',
                        name: 'oldPassword',
                        type: 'password',
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
                        id: 'newPassword',
                        placeholder: 'Новый пароль',
                        name: 'newPassword',
                        type: 'password',
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
                        id: 'repeateNewPassword',
                        placeholder: 'Повторите новый пароль',
                        name: 'repeateNewPassword',
                        type: 'password',
                        validation: {
                            required: true,
                        },
                        useValidation: (validate: () => void) => {
                            this.props.repeatedPasswordValidate = validate;
                        },
                        onInput: (value: string) => {
                            const password: HTMLInputElement | null =
                                this.getContent().querySelector(
                                    '[name=newPassword]'
                                );
                            const SecondPassword: HTMLInputElement | null =
                                this.getContent().querySelector(
                                    '[name=repeateNewPassword]'
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
                        label: 'Сохранить',
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

        console.log(formData);
    }

    validate() {
        const formElement: HTMLFormElement | null =
            this.getContent().querySelector('.profile');
        validateForm(formElement);
    }

    render(): string | void {
        return compile(template, this.props);
    }
}
