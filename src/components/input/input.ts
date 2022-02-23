import Block from "../../modules/Block";
import { compile } from "../../utils/templator";
import { template } from "./input.tmpl";
import './input.css'

interface IInput {
    className?: string;
    id?: string;
    label?: string;
    value?: string;
    type?: string;
    name?: string;
}

export default class Input extends Block {
    constructor(props: IInput) {
        super("div", {
            className: "input",
            type: props.type ?? "",
            id: props.id ?? "",
            label: props.label ?? "",
            value: props.value ?? "",
            name: props.name ?? "",
        });
    }

    render(): string {
        return compile(template, this.props);
    }
}
