import Block from '../../../modules/Block';
import { compile } from '../../../modules/templator';
import { template } from './chatListCard.tmpl';
import ChatCard from '../chatCard/chatCard';

import './chatListCard.css';

interface IChatCardList {
    chats: unknown[];
    onSelect: (chatId: number) => void;
}

export default class ChatCardList extends Block {
    constructor(props: IChatCardList) {
        super('ul', {
            className: 'chat-card-list',
            chats: props.chats,
            onSelect: props.onSelect ?? (() => {}),
            ChatCard,
        });
    }

    render() {
        return compile(template, this.props);
    }
}
