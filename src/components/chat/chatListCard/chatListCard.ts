import Block from '../../../modules/Block';
import { compile } from '../../../modules/templator';
import { template } from './chatListCard.tmpl';
import ChatCard from '../chatCard/chatCard';
import { IChat } from '../../../types/models';

import './chatListCard.css';

interface IChatCardList {
    chats: IChat[];
    isLoading?: boolean;
    hasQuery?: boolean;
    onSelect: (chatId: number) => void;
    onDelete: (chatId: number) => void;
}

export default class ChatCardList extends Block {
    constructor(props: IChatCardList) {
        super('ul', {
            className: 'chat-card-list',
            chats: props.chats,
            isLoading: props.isLoading ?? false,
            hasQuery: props.hasQuery ?? false,
            onSelect: props.onSelect ?? (() => {}),
            onDelete: props.onDelete ?? (() => {}),
            ChatCard,
        });
    }

    render() {
        return compile(template, this.props);
    }
}
