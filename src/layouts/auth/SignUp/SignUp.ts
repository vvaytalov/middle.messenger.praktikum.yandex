import Input from "../../../components/input/input";
import Link from "../../../components/link/link";
import Button from "../../../components/button/button";
import Block from "../../../modules/Block";
import { template } from "./SignUp.tmpl";
import { compile } from "../../../utils/templator";
import "../auth.css";
import validateForm from "../../../utils/valideteForm";
import {
    REGEX_EMAIL,
    REGEX_LOGIN,
    REGEX_NAME,
    REGEX_PASSWORD,
    REGEX_TEL,
} from "../../../utils/regEx";

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
                        placeholder: "Почта",
                        id: "email",
                        validation: {
                            pattern: REGEX_EMAIL,
                            minlength: 5,
                            maxlength: 50,
                            required: true,
                            "data-error": "Поле в формате email",
                        },
                        onInput: (value: string) => console.log("Mail:", value),
                        onValidate: () => this.validate(),
                    },
                    {
                        type: "text",
                        name: "login",
                        placeholder: "Логин",
                        id: "login",
                        validation: {
                            pattern: REGEX_LOGIN,
                            maxlength: 30,
                            required: true,
                            "data-error": "Англ. буквы, от 3 до 16 символов",
                        },
                        onInput: (value: string) =>
                            console.log("Login:", value),
                        onValidate: () => this.validate(),
                    },
                    {
                        type: "text",
                        name: "first_name",
                        placeholder: "Имя",
                        id: "first_name",
                        validation: {
                            pattern: REGEX_NAME,
                            maxlength: 30,
                            required: true,
                            "data-error": "Буквы, дефис или точка",
                        },
                        onInput: (value: string) =>
                            console.log("Login:", value),
                        onValidate: () => this.validate(),
                    },
                    {
                        type: "text",
                        name: "second_name",
                        placeholder: "Фамилия",
                        id: "second_name",
                        validation: {
                            pattern: REGEX_NAME,
                            maxlength: 30,
                            required: true,
                            "data-error": "Буквы, дефис или точка",
                        },
                        onInput: (value: string) =>
                            console.log("Login:", value),
                        onValidate: () => this.validate(),
                    },
                    {
                        type: "tel",
                        name: "tel",
                        placeholder: "Телефон",
                        id: "tel",
                        validation: {
                            pattern: REGEX_TEL,
                            maxlength: 20,
                            required: true,
                            "data-error": "Поле в формате: +79996431241",
                        },
                        onInput: (value: string) =>
                            console.log("Login:", value),
                        onValidate: () => this.validate(),
                    },
                    {
                        type: "password",
                        name: "password",
                        placeholder: "Пароль",
                        id: "password",
                        validation: {
                            pattern: REGEX_PASSWORD,
                            maxlength: 200,
                            required: true,
                            "data-error": "Добавьте символы: !@#$%^&*",
                        },
                        onInput: (value: string) => {
                            console.log("Password:", value);
                            this.props.repeatedPasswordValidate();
                        },
                        onValidate: () => this.validate(),
                    },
                    {
                        type: "password",
                        name: "second_password",
                        placeholder: "Повторите пароль",
                        id: "second_password",
                        validation: {
                            required: true,
                        },
                        useValidation: (validate: () => void) => {
                            this.props.repeatedPasswordValidate = validate;
                        },
                        onInput: (value: string) => {
                            const password: HTMLInputElement | null =
                                this.getContent().querySelector(
                                    "[name=password]"
                                );
                            const SecondPassword: HTMLInputElement | null =
                                this.getContent().querySelector(
                                    "[name=second_password]"
                                );

                            if (!password || !SecondPassword) {
                                return;
                            }

                            if (password.value === value) {
                                SecondPassword.setCustomValidity("");
                                this.props.repeatedPasswordValidate();
                            } else {
                                SecondPassword.setCustomValidity(
                                    "Пароли не совпадают"
                                );
                                this.props.repeatedPasswordValidate();
                            }
                        },
                        onValidate: () => this.validate(),
                    },
                ],
                buttons: [
                    {
                        type: "submit",
                        label: "Зарегистрироваться",
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
            (el) => el.nodeName === "INPUT"
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
            this.getContent().querySelector(`.auth`);
        validateForm(formElement);
    }

    render() {
        return compile(template, this.props);
    }
}

document.body.prepend(new SignInPage().getContent());
