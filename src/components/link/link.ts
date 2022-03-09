import Block from '../../modules/Block';
import { compile } from '../../utils/templator';
import { template } from './link.tmpl';
import './link.css';

interface IField {
    label?: string;
    link?: string;
    color?: boolean;
}
interface ILink {
    type?: string;
    color?: boolean;
    links: IField[];
}

export default class Link extends Block {
    constructor(props: ILink) {
        super('div', {
            className: 'link',
            links: props.links ?? [],
        });
    }

    render() {
        return compile(template, this.props);
    }
}
