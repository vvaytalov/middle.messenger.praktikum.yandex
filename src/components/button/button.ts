import Block from "../../modules/Block";
import { compile } from "../../utils/templator";
import { template } from "./button.tmpl";
import "./button.css";

interface IButton {
    type?: string;
    label?: string;
}

export default class Button extends Block {
    constructor(props: IButton) {
        super("button", {
            className: "button",
            type: props.type ?? "button",
            label: props.label ?? "",
        });
    }

    render() {
        return compile(template, this.props);
    }
}
