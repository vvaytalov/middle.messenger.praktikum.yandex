import { compile } from "../../../utils/templator";
import { template } from "./messageInput.tmpl";
import sendIcon from "../../../assets/img/message-arrow.svg";
import Block from "../../../modules/Block";
import Input from "../../input/input";
import Button from "../../button/button";
import defaultIcon from "../../../assets/img/attach.svg";

import "./messageInput.css";

interface IMessageInput {
    onMessageInput: (value: string) => void;
    onMessageSend: (formData: Record<string, string>) => void;
}

export default class MessageInput extends Block {
    constructor(props: IMessageInput) {
        super("div", {
            className: "message-input",
            classNameForm: "message-input__form",
            icon: defaultIcon,
            MessageInput: new Input({
                placeholder: "Cообщение",
                classMix: "message-input__input",
                name: "message",
                onInput: props.onMessageInput,
            }),
            SendButton: new Button({
                type: "submit",
                icon: sendIcon,
                light: true,
            }),
            onMessageSend: props.onMessageSend,
        });
    }

    render() {
        return compile(template, this.props);
    }
}
