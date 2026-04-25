import Block from '../../modules/Block';
import { compile } from '../../modules/templator';
import { template } from './toast.tmpl';

import './toast.css';

interface IToastItem {
    id: number;
    type: 'success' | 'error' | 'info';
    message: string;
}

class ToastContainer extends Block {
    constructor() {
        super('div', {
            className: 'toast-container',
            toasts: [],
        });
    }

    public addToast(toast: IToastItem) {
        this.setProps({
            toasts: [...this.props.toasts, toast],
        });
    }

    public removeToast(id: number) {
        this.setProps({
            toasts: this.props.toasts.filter(
                (toast: IToastItem) => toast.id !== id,
            ),
        });
    }

    render() {
        return compile(template, this.props);
    }
}

export default new ToastContainer();
