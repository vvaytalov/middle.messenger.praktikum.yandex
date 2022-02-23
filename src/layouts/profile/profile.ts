import Block from "../../modules/Block";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import Link from "../../components/link/link";
import avatarImage from "../../assets/img/noavatar.svg";
import { compile } from "../../utils/templator";
import { template } from "./profile.tmpl";
import "./profile.css";

export default class Profile extends Block {
    constructor() {
        super("main", {
            className: "profile",
            title: "@vvaytalov",
            avatar: avatarImage,
            Link: new Link({
                field: [
                    {
                        label: "Изменить пароль",
                        link: "/password-change.html",
                    },
                    {
                        label: "Выход",
                        link: "/sign-in.html",
                        color: true,
                    },
                ],
            }),
            form: {
                links: [
                    {
                        label: "Изменить пароль",
                        link: "/password-change.html",
                    },
                    {
                        label: "Выход",
                        link: "/sign-in.html",
                        color: true,
                    },
                ],
                fields: [
                    {
                        type: "email",
                        name: "email",
                        label: "Почта",
                        id: "email",
                        value: "vvaytalov@ya.ru",
                    },
                    {
                        type: "text",
                        name: "login",
                        label: "Логин",
                        id: "login",
                        value: "vvaytalov",
                    },
                    {
                        type: "text",
                        name: "first_name",
                        label: "Имя",
                        id: "first_name",
                        value: "Vlad",
                    },
                    {
                        type: "text",
                        name: "second_name",
                        label: "Фамилия",
                        id: "second_name",
                        value: "Vaytalov",
                    },
                    {
                        type: "tel",
                        name: "tel",
                        label: "Телефон",
                        id: "tel",
                        value: "+7 (999) 999-99-99",
                    },
                    {
                        type: "password",
                        name: "password",
                        label: "Пароль",
                        id: "password",
                    },
                    {
                        type: "password",
                        name: "second_password",
                        label: "Повторите пароль",
                        id: "second_password",
                    },
                ],
                buttons: [
                    {
                        type: "submit",
                        label: "Сохранить",
                    },
                ],
            },
        });

        this.props.Button = this.props.form.buttons.map(
            (button: any) => new Button(button)
        );
        this.props.Input = this.props.form.fields.map(
            (field: any) => new Input(field)
        );
    }

    render(): string | void {
        return compile(template, this.props);
    }
}

document.body.append(new Profile().getContent());
