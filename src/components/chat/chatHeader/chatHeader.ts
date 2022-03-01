import { compile } from "../../../utils/templator";
import { template } from "./chatHeader.tmpl";
import defaultAvatar from "../../../assets/img/noavatar.svg";
import Block from "../../../modules/Block";

import "./chatHeader.css";

interface IChatHeader {
    name: string;
    avatar?: string | null;
}

class ChatHeader extends Block {
    constructor(props: IChatHeader) {
        super("div", {
            className: "chat-header",
            avatar: props.avatar ?? defaultAvatar,
            name: props.name ?? "",
        });
    }

    render() {
        return compile(template, this.props);
    }
}

export default ChatHeader;
