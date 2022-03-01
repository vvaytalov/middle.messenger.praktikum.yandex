import Link from "../../../components/link/link";
import Block from "../../../modules/Block";
import Button from "../../../components/button/button";
import Input from "../../../components/input/input";
import avatarImage from "../../../assets/img/noavatar.svg";
import { compile } from "../../../utils/templator";
import { template } from "./change_password.tmpl";

import "../profile.css";

export default class ChangePassword extends Block {
    constructor() {
        super("main", {
            className: "profile",
            avatar: avatarImage,
            Link: new Link({
                field: [
                    {
                        label: "В профиль",
                        link: "/profile.html",
                    },
                ],
            }),
            form: {
                fields: [
                    {
                        id: "oldPassword",
                        placeholder: "Старый пароль",
                        name: "oldPassword",
                        type: "password",
                    },
                    {
                        id: "newPassword",
                        placeholder: "Новый пароль",
                        name: "newPassword",
                        type: "password",
                    },
                    {
                        id: "newPassword",
                        placeholder: "Повторите новый пароль",
                        name: "newPassword",
                        type: "password",
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

document.body.append(new ChangePassword().getContent());
