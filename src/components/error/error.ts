import Block from '../../modules/Block';
import Link from '../link/link';
import { compile } from '../../modules/templator';
import { template } from './error.tmpl';
import './error.css';

interface IError {
    codeError: string | number;
    messageError: string;
    to?: string;
    label?: string;
}

export default class Error extends Block {
    constructor(props: IError) {
        super('div', {
            className: 'error',
            codeError: props.codeError ?? '500',
            messageError: props.messageError ?? 'Неизвестная ошибка',
            Link: new Link({
                to: props.to || '/',
                label: props.label || 'Вернуться к чатам',
            }),
        });
    }

    render() {
        return compile(template, this.props);
    }
}
