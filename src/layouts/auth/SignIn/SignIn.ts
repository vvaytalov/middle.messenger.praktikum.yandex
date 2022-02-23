import Block from "../../../modules/Block";
import Button from "../../../components/button/button";
import Input from "../../../components/input/input";
import { template } from "./SignIn.tmpl";
import { compile } from "../../../utils/templator";
import Link from "../../../components/link/link";
import "../auth.css";

class SignInPage extends Block {
    constructor() {
        super("main", {
            className: "auth",
            title: "Вход",
            returnLinkText: "Нет аккаунта?",
            returnLink: "./sign-up.html",
            Link: new Link({
                field: [
                    {
                        label: "Нет аккаунта ?",
                        link: "/sign-up.html",
                    }
                ],
            }),
            form: {
                fields: [
                    {
                        type: "text",
                        name: "login",
                        label: "Логин",
                        value: "ivanivanov",
                    },
                    {
                        type: "password",
                        name: "password",
                        label: "Пароль",
                    },
                ],
                buttons: [
                    {
                        type: "submit",
                        label: "Авторизация",
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
