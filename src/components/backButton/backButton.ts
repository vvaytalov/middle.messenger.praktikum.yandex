import Block from '../../modules/Block';
import { compile } from '../../modules/templator';
import { template } from './backButton.tmpl';
import Link from '../link/link';
import './backButton.css';

interface ILink {
    className?: string;
}

export default class backButton extends Block {
    constructor(props: ILink) {
        super('div', {
            className: props.className ?? '',
            Link: new Link({
                to: '/',
                className: 'link_back',
            }),
        });
    }

    render(): string | void {
        return compile(template, this.props);
    }
}
