import Block from '../../modules/Block';
import { compile } from '../../utils/templator';
import { template } from './link.tmpl';
import './link.css';

interface ILink {
    type?: string;
    color?: boolean;
    field: {
        label?: string;
        link?: string;
        color?: boolean;
    }[];
}

export default class Link extends Block {
    constructor(props: ILink) {
        super('div', {
            className: 'link',
            field: props.field ?? [],
        });
    }

    render() {
        return compile(template, this.props);
    }
}
