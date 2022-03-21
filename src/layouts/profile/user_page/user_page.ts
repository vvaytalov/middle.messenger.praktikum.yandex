import Block from '../../../modules/Block';
import Link from '../../../components/link/link';
import avatarImage from '../../../assets/img/noavatar.svg';
import { compile } from '../../../modules/templator';
import { template } from './user_page.tmpl';
import backButton from '../../../components/backButton/backButton';
import {
    handleFormSubmit,
    registerFormElements,
    validateForm,
} from '../../../utils/handleForm';
import AuthControllers from '../../../controllers/AuthControllers';
import Button from '../../../components/button/button';
import UserControllers from '../../../controllers/UserControllers';
import {
    LOGIN_MSG,
    MAIL_MSG,
    NAME_MSG,
    REGEX_EMAIL,
    REGEX_LOGIN,
    REGEX_NAME,
    REGEX_TEL,
    REGEX_TEXT,
    TEL_MSG,
    VALUE,
} from '../../../utils/regEx';

import ImageFile from '../../../components/imageFile/ImageFile';
import env from '../../../utils/env';
import '../profile.css';
import { store } from '../../../store';
export default class Profile extends Block {
    constructor() {
        super('main', {
            className: 'profile',
            LinkPassword: new Link({
                label: 'Изменить пароль',
                to: '/change_password',
            }),
            LinkLogout: new Button({
                label: 'Выход',
                light: true,
                onClick: () => {
                    AuthControllers.LogOut();
                },
            }),
            LinkBack: new backButton({
                className: 'back',
            }),
            AvatarChoose: new ImageFile({
                classMix: 'profile__choose-avatar',
                src: avatarImage,
                alt: 'Аватар',
                onChange: (file) => {
                    const formData = new FormData();
                    formData.append('avatar', file);
                    UserControllers.updateAvatar(formData);
                },
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
                        type: 'text',
                        name: 'display_name',
                        placeholder: 'Имя в чате',
                        id: 'text',
                        validation: {
                            pattern: REGEX_TEXT,
                            maxlength: 20,
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
                        label: 'Сохранить',
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
        this.setField = this.setField.bind(this);
    }

    validate() {
        const formElement: HTMLFormElement | null =
            this.getContent().querySelector(`.${this.props.className}`);
        validateForm(formElement);
    }

    handleSubmit(evt: Event) {
        const formData = handleFormSubmit(evt);
        UserControllers.updateProfile({
            first_name: formData.first_name,
            second_name: formData.second_name,
            display_name: formData.display_name,
            login: formData.login,
            email: formData.email,
            phone: formData.phone,
        }).then(() => {
            AuthControllers.CheckAuth();
        });
    }

    setField(formDate: Record<string, string>) {
        if (!formDate) {
            return;
        }

        const formElement: HTMLFormElement | null =
            this.getContent().querySelector(`.${this.props.className}`);

        if (!formElement) {
            return;
        }

        const { elements } = formElement as HTMLFormElement;

        const fields = Array.from(elements).filter(
            (el) => el.nodeName === 'INPUT'
        );

        fields.forEach((field: HTMLInputElement) => {
            field.value = formDate[field.name];
        });
    }

    public componentDidMount(): void {
        store.subscribe((state) => {
            this.setField(state.currentUser);

            this.props.AvatarChoose.props.src = state.currentUser?.avatar
                ? env.HOST_RESOURCES + state.currentUser?.avatar
                : avatarImage;

            this.props.AvatarChoose.setProps({
                title: '@' + state.currentUser?.display_name,
            });
        });
    }

    render(): string | void {
        return compile(template, this.props);
    }
}
