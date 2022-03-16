import Block from '../../../modules/Block';
import { compile } from '../../../utils/templator';
import { template } from './chatListCard.tmpl';
import ChatCard from '../cardContact/chatCard';

import './chatListCard.css';

interface IChatCardList {
    chats: unknown[];
}

export default class ChatCardList extends Block {
    constructor(props: IChatCardList) {
        super('ul', {
            className: 'chat-card-list',
            chats: props.chats,
            ChatCard,
        });
    }

    render() {
        console.log('render ChatCardList', this.props.chats);
        return compile(template, this.props);
    }
}
