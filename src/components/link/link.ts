import Block from '../../modules/Block';
import { compile } from '../../utils/templator';
import { template } from './link.tmpl';
import { router } from '../../index';
import './link.css';
interface ILink {
    type?: string;
    color?: boolean;
    target?: string;
    to?: string;
    label?: string;
    className?: string;
    onClick?: () => void;
}

export default class Link extends Block {
    constructor(props: ILink) {
        super('a', {
            className: props.className ? props.className : 'link',
            target: props.target ?? '',
            to: props.to ?? '',
            label: props.label ?? '',
            color: props.color ?? '',
            events: {
                click: (evt: MouseEvent) => {
                    if (this.props.target === '_blank') {
                        return;
                    }
                    if (!props.to) {
                        return props.onClick;
                    }

                    evt.preventDefault();
                    router.go(this.props.to);
                },
            },
        });
    }

    render() {
        return compile(template, this.props);
    }
}
