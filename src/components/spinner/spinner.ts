import Block from '../../modules/Block';
import { compile } from '../../utils/templator';
import { template } from './spinner.tmpl';
import './spinner.css';

export default class Spinner extends Block {
    constructor() {
        super('div', {
            className: 'loading',
        });
    }

    render() {
        return compile(template, this.props);
    }
}