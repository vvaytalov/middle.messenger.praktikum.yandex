import Block from '../../modules/Block';
import { compile } from '../../modules/templator';
import { template } from './spinner.tmpl';
import './spinner.css';

class Spinner extends Block {
    constructor() {
        super('div', {
            className: 'loading',
        });
    }

    render() {
        return compile(template, this.props);
    }
}

export default new Spinner();
