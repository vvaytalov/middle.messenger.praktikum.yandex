import Block from '../../modules/Block';
import { compile } from '../../utils/templator';
import { template } from './button.tmpl';
import './button.css';

interface IButton {
    classMix?: string;
    type?: string;
    icon?: string;
    light?: boolean;
    color?: string;
    label?: string;
    title?: string;
    onClick?: () => void;
}

export default class Button extends Block {
    constructor(props: IButton) {
        super('button', {
            className: 'button',
            type: props.type ?? 'button',
            icon: props.icon ?? '',
            light: props.light ?? false,
            color: props.color ?? '',
            label: props.label ?? '',
            title: props.title ?? '',
            events: {
                click: props.onClick,
            },
        });
    }

    render() {
        return compile(template, this.props);
    }
}
