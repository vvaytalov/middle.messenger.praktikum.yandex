import Block from '../../modules/Block';
import { compile } from '../../modules/templator';
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
    disabled?: boolean;
    onClick?: () => void;
}

export default class Button extends Block {
    constructor(props: IButton) {
        super('button', {
            className: 'button',
            classMix: !props.light ? 'button' : 'button button_trans',
            type: props.type ?? 'button',
            icon: props.icon ?? '',
            light: props.light ?? false,
            color: props.color ?? '',
            label: props.label ?? '',
            title: props.title ?? '',
            disabled: props.disabled,
            events: {
                click: props.onClick,
            },
        });
    }

    render() {
        return compile(template, this.props);
    }
}
