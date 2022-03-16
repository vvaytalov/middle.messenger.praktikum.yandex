import Block from '../../../modules/Block';
import { compile } from '../../../utils/templator';
import { template } from './chatCard.tmpl';
import defaultIcon from '../../../assets/img/noavatar.svg';
import './chatCard.css';

interface IChatCard {
    id: number;
    created_by: number;
    title: string;
    avatar: string | null;
    last_message: {} | null;
    unread_count: number;
}

class ChatCard extends Block {
    constructor(props: IChatCard) {
        super('div', {
            className: 'chat-card',
            id: props.id,
            unread_count: props.unread_count,
            created_by: props.created_by,
            title: props.title,
            avatar: props.avatar ?? defaultIcon,
            last_message: props.last_message,
        });
    }

    render() {
        return compile(template, {
            ...this.props,
            time: this.props.lastMessage?.time || null,
            formattedTime: this.props.lastMessage?.time || null,
        });
    }
}

export default ChatCard;
