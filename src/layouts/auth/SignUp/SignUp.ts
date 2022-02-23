import Input from "../../../components/input/input";
import Link from "../../../components/link/link";
import Button from "../../../components/button/button";
import Block from "../../../modules/Block";
import { template } from "./SignUp.tmpl";
import { compile } from "../../../utils/templator";
import "../auth.css";

class SignInPage extends Block {
    constructor() {
        super("main", {
            className: "auth",
            title: "Регистрация",
            returnLinkText: "Войти",
            returnLink: "./sign-in.html",
            Link: new Link({
                field: [
                    {
                        label: "Войти",
                        link: "/sign-in.html",
                    },
                ],
            }),
            form: {
                fields: [
                    {
                        type: "email",
                        name: "email",
                        label: "Почта",
                        id: "email",
                    },
                    {
                        type: "text",
                        name: "login",
                        label: "Логин",
                        id: "login",
                    },
                    {
                        type: "text",
                        name: "first_name",
                        label: "Имя",
                        id: "first_name",
                    },
                    {
                        type: "text",
                        name: "second_name",
                        label: "Фамилия",
                        id: "second_name",
                    },
                    {
                        type: "tel",
                        name: "tel",
                        label: "Телефон",
                        id: "tel",
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
                        label: "Зарегистрироваться",
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

    render() {
        return compile(template, this.props);
    }
}

document.body.prepend(new SignInPage().getContent());
