import Block from '../../../modules/Block';
import { compile } from '../../../modules/templator';
import { template } from './404.tmpl';
import Error from '../../../components/error/error';

export default class Error404Page extends Block {
    constructor() {
        super('div', {
            className: 'error',
            Error: new Error({
                codeError: '404',
                messageError: 'Не туда попали',
            }),
        });
    }

    render() {
        return compile(template, this.props);
    }
}
