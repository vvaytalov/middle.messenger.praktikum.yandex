import Block from '../../../modules/Block';
import { compile } from '../../../modules/templator';
import { template } from './chatCard.tmpl';
import { store } from '../../../store';
import defaultIcon from '../../../assets/img/noavatar.svg';
import './chatCard.css';
import formatDate from '../../../utils/formatDate';

interface IChatCard {
    id: number;
    created_by: number;
    title: string;
    avatar: string | null;
    last_message: {} | null;
    unread_count: number;
    onClick: (chatId: number) => void;
}

class ChatCard extends Block {
    constructor(props: IChatCard) {
        super('div', {
            className: 'chat-card',
            classNameRoot:
                props.id === store.state.chatId
                    ? 'chat-card chat-card__active'
                    : 'chat-card',
            id: props.id,
            unread_count: props.unread_count,
            created_by: props.created_by,
            title: props.title,
            avatar: props.avatar ?? defaultIcon,
            last_message: props.last_message || '',
            onClick: props.onClick,
            events: {
                click: () => this.props.onClick(this.props.id),
            },
        });
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
