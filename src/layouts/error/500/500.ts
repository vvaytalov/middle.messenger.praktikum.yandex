import Error from '../../../components/error/error';
import Block from '../../../modules/Block';
import { compile } from '../../../modules/templator';
import { template } from './500.tmpl';

export default class Error500Page extends Block {
    constructor() {
        super('div', {
            className: 'error',
            Error: new Error({
                codeError: '500',
                messageError: 'Мы уже фиксим',
            }),
        });
    }

    render(): string | void {
        return compile(template, this.props);
    }
}
