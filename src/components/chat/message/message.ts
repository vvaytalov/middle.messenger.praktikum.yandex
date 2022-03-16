import { compile } from '../../../utils/templator';
import { template } from './message.tmpl';
import defaultAvatar from '../../../assets/img/noavatar.svg';
import Block from '../../../modules/Block';

import './message.css';

interface IMessage {
    id: string;
    ownerId: string;
    authorId: string;
    authorName: string;
    text: string;
    avatar: string | null;
    date: string;
}

export default class Message extends Block {
    constructor(props: IMessage) {
        super('li', {
            className: 'message',
            id: props.id,
            ownerId: props.ownerId,
            authorId: props.authorId,
            authorName: props.authorName,
            text: props.text,
            avatar: props.avatar ?? defaultAvatar,
            date: props.date,
            formattedDate: props.date,
        });
    }

    render() {
        return compile(template, this.props);
    }
}
