import { compile } from '../../modules/templator';
import { template } from './popup.tmpl';
import Block from '../../modules/Block';
import './popup.css';

interface IPopup {
    classMix?: string;
    title?: string;
    children?: string;
    closeButton?: boolean;
    comeBackButton?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}

export default class Popup extends Block {
    constructor(props: IPopup) {
        super('div', {
            className: 'popup',
            classNameRoot: 'popup',
            classNameRootOpen: 'popup popup_opened',
            classNameCard: 'popup__card chat-page__new-chat-popup',
            title: props.title ?? '',
            children: props.children ?? '',
            comeBackButton: props.comeBackButton ?? false,
            onOpen: props.onOpen ?? (() => {}),
            onClose: props.onClose ?? (() => {}),
        });
        this.handleOverlay = this.handleOverlay.bind(this);
        this.handleEsc = this.handleEsc.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
    }

    handleOverlay(evt: MouseEvent) {
        if (!(evt.target as HTMLElement).closest('.popup__card')) {
            this.togglePopup(false);
        }
    }

    handleEsc(evt: KeyboardEvent) {
        if (evt.key === 'Escape') {
            this.togglePopup(false);
        }
    }

    togglePopup(isOpen: boolean) {
        const popupElement = this.getContent();
        if (!popupElement) {
            return;
        }
        if (isOpen) {
            popupElement.className = this.props.classNameRootOpen;
            document.addEventListener('mousedown', this.handleOverlay);
            document.addEventListener('keydown', this.handleEsc);
            this.props.onOpen();
        } else {
            popupElement.className = this.props.classNameRoot;
            document.removeEventListener('mousedown', this.handleOverlay);
            document.removeEventListener('keydown', this.handleEsc);
            this.props.onClose();
        }
    }

    show() {
        this.togglePopup(true);
    }

    hide() {
        this.togglePopup(false);
    }

    render() {
        return compile(template, this.props);
    }

    onDestroy() {
        document.removeEventListener('mousedown', this.handleOverlay);
        document.removeEventListener('keydown', this.handleEsc);
    }
}
