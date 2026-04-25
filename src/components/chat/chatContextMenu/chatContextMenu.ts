import trashIcon from '../../../assets/img/trash.svg';
import Block from '../../../modules/Block';
import { compile } from '../../../modules/templator';
import Button from '../../button/button';
import { template } from './chatContextMenu.tmpl';

import './chatContextMenu.css';

interface IChatContextMenuProps {
    chatId: number;
    onDelete: (chatId: number) => void;
}

export default class ChatContextMenu extends Block {
    constructor(props: IChatContextMenuProps) {
        super('div', {
            className: 'chat-context-menu',
            classNameRoot: 'chat-context-menu',
            classNameRootOpen: 'chat-context-menu chat-context-menu_opened',
            style: {
                left: '0px',
                top: '0px',
            },
            chatId: props.chatId,
            MenuDeleteButton: new Button({
                label: 'Удалить чат',
                icon: trashIcon,
                light: true,
                classMix: 'chat-context-menu__action',
                onClick: () => {
                    this.props.onDelete(this.props.chatId);
                    this.close();
                },
            }),
            onDelete: props.onDelete,
        });
        this.handleOverlay = this.handleOverlay.bind(this);
        this.handleEsc = this.handleEsc.bind(this);
        this.handleMenuOpen = this.handleMenuOpen.bind(this);
    }

    private handleOverlay(evt: MouseEvent) {
        if (!(evt.target as HTMLElement).closest('.chat-context-menu')) {
            this.close();
        }
    }

    private handleEsc(evt: KeyboardEvent) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    private handleMenuOpen(evt: Event) {
        const customEvent = evt as CustomEvent<{ chatId: number }>;
        if (customEvent.detail.chatId !== this.props.chatId) {
            this.close();
        }
    }

    public open(position: { x: number; y: number }) {
        const menuWidth = 196;
        const menuHeight = 56;
        const nextX = Math.min(position.x, window.innerWidth - menuWidth);
        const nextY = Math.min(position.y, window.innerHeight - menuHeight);

        this.props.style = {
            left: `${Math.max(8, nextX)}px`,
            top: `${Math.max(8, nextY)}px`,
        };
        this.props.classNameRoot = this.props.classNameRootOpen;
        document.addEventListener('mousedown', this.handleOverlay);
        document.addEventListener('keydown', this.handleEsc);
        window.dispatchEvent(
            new CustomEvent('chat-context-menu:open', {
                detail: {
                    chatId: this.props.chatId,
                },
            }),
        );
    }

    public close() {
        this.props.classNameRoot = 'chat-context-menu';
        document.removeEventListener('mousedown', this.handleOverlay);
        document.removeEventListener('keydown', this.handleEsc);
    }

    public componentDidMount() {
        window.addEventListener('chat-context-menu:open', this.handleMenuOpen);
    }

    public onDestroy() {
        document.removeEventListener('mousedown', this.handleOverlay);
        document.removeEventListener('keydown', this.handleEsc);
        window.removeEventListener(
            'chat-context-menu:open',
            this.handleMenuOpen,
        );
    }

    render() {
        return compile(template, this.props);
    }
}
