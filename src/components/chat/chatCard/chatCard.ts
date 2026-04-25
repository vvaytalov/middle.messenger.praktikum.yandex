import Block from '../../../modules/Block';
import { compile } from '../../../modules/templator';
import { template } from './chatCard.tmpl';
import { store } from '../../../store';
import defaultIcon from '../../../assets/img/noavatar.svg';
import './chatCard.css';
import formatDate from '../../../utils/formatDate';
import ChatContextMenu from '../chatContextMenu/chatContextMenu';
import { IChat } from '../../../types/models';
import { getActiveChatId } from '../../../utils/chatSelectors';

interface IChatCard extends IChat {
    onClick: (chatId: number) => void;
    onDelete: (chatId: number) => void;
}

class ChatCard extends Block {
    constructor(props: IChatCard) {
        super('div', {
            className: 'chat-card',
            classNameRoot:
                props.id === getActiveChatId(store.state)
                    ? 'chat-card chat-card__active'
                    : 'chat-card',
            id: props.id,
            unread_count: props.unread_count,
            created_by: props.created_by,
            title: props.title,
            avatar: props.avatar ?? defaultIcon,
            last_message: props.last_message || '',
            onClick: props.onClick,
            onDelete: props.onDelete,
            ChatContextMenu: new ChatContextMenu({
                chatId: props.id,
                onDelete: props.onDelete,
            }),
            events: {
                click: (evt: MouseEvent) => this.handleClick(evt),
                contextmenu: (evt: MouseEvent) => this.handleContextMenu(evt),
                keydown: (evt: KeyboardEvent) => this.handleKeyDown(evt),
            },
        });
    }

    private handleClick(evt: MouseEvent) {
        if ((evt.target as HTMLElement).closest('.chat-context-menu')) {
            return;
        }
        this.props.ChatContextMenu.close();
        this.props.onClick(this.props.id);
    }

    private handleContextMenu(evt: MouseEvent) {
        evt.preventDefault();
        this.props.ChatContextMenu.open({
            x: evt.clientX,
            y: evt.clientY,
        });
    }

    private handleKeyDown(evt: KeyboardEvent) {
        if (evt.key === 'ContextMenu' || (evt.shiftKey && evt.key === 'F10')) {
            evt.preventDefault();
            const { top, right } = this.getContent().getBoundingClientRect();
            this.props.ChatContextMenu.open({
                x: right - 12,
                y: top + 12,
            });
        }
    }

    render() {
        return compile(template, {
            ...this.props,
            time: this.props.last_message?.time || null,
            formatted_time: formatDate(this.props.last_message?.time || null),
        });
    }
}

export default ChatCard;
