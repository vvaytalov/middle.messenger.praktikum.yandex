import Block from "../../modules/Block";
import Input from "../../components/input/input";
import ContactCardList from "../../components/chat/listCard/listCard";
import ChatHeader from "../../components/chat/chatHeader/chatHeader";
import MessageList from "../../components/chat/messageList/messageList";
import MessageInput from "../../components/chat/messageInput/messageInput";
import { contacts, messages } from "./mock/mock";
import { compile } from "../../utils/templator";
import { template } from "./chat.tmpl";

import "./chat.css";
import Link from "../../components/link/link";

export default class Chat extends Block {
    constructor() {
        super("div", {
            className: "chat-page",
            SearchInput: new Input({
                placeholder: "Поиск",
                type: "search",
                onInput: (value) => console.log("Поле поиска:", value),
            }),
            ContactCardList: new ContactCardList({
                contacts,
            }),
            ChatHeader: new ChatHeader({
                name: "vvaytalov",
            }),
            MessageList: new MessageList({
                messages,
            }),
            MessageInput: new MessageInput({
                onMessageInput: (value) =>
                    console.log("Ввод нового сообщения", value),
                onMessageSend: (formData) => console.log(formData),
            }),
            Link: new Link({
                field: [
                    {
                        link: "/profile.html",
                        label: "Профиль",
                    },
                ],
            }),
        });
    }

    render() {
        return compile(template, this.props);
    }
}

document.body.prepend(new Chat().getContent());
