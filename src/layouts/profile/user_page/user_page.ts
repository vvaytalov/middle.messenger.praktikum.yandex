import Block from '../../../modules/Block';
import Link from '../../../components/link/link';
import avatarImage from '../../../assets/img/noavatar.svg';
import { compile } from '../../../utils/templator';
import { template } from './user_page.tmpl';
import '../profile.css';
import backButton from '../../../components/backButton/backButton';
import { registerFormElements } from '../../../utils/handleForm';

export default class Profile extends Block {
    constructor() {
        super('main', {
            className: 'profile',
            title: '@vvaytalov',
            avatar: avatarImage,
            LinkPassword: new Link({
                label: 'Изменить пароль',
                to: '/change_password',
            }),
            LinkLogout: new Link({
                label: 'Выход',
                to: '/sign-in',
                color: true,
            }),
            LinkBack: new backButton({
                className: 'back',
            }),
            form: {
                fields: [
                    {
                        type: 'email',
                        name: 'email',
                        placeholder: 'Почта',
                        id: 'email',
                        value: 'vvaytalov@ya.ru',
                    },
                    {
                        type: 'text',
                        name: 'login',
                        placeholder: 'Логин',
                        id: 'login',
                        value: 'vvaytalov',
                    },
                    {
                        type: 'text',
                        name: 'first_name',
                        placeholder: 'Имя',
                        id: 'first_name',
                        value: 'Vlad',
                    },
                    {
                        type: 'text',
                        name: 'second_name',
                        placeholder: 'Фамилия',
                        id: 'second_name',
                        value: 'Vaytalov',
                    },
                    {
                        type: 'tel',
                        name: 'phone',
                        placeholder: 'Телефон',
                        id: 'tel',
                        value: '+7 (999) 999-99-99',
                    },
                ],
                buttons: [
                    {
                        type: 'submit',
                        label: 'Сохранить',
                    },
                ],
            },
        });

        registerFormElements(this.props);
    }

    render(): string | void {
        return compile(template, this.props);
    }
}
