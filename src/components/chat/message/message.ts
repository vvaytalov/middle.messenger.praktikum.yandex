import { compile } from '../../../utils/templator';
import { template } from './message.tmpl';
import defaultAvatar from '../../../assets/img/noavatar.svg';
import Block from '../../../modules/Block';

import './message.css';
import { store } from '../../../store';
import formatDate from '../../../utils/formatDate';

interface IMessage {
    id: string;
    chat_id: number;
    user_id: number;
    type: string;
    content: string;
    file: string | null;
    is_read: boolean;
    time: string;
    avatar: string;
}

export default class Message extends Block {
    constructor(props: IMessage) {
        console.log(props, '!!!!!!!!!');

        super('li', {
            className: 'message',
            classNameRoot:
                props.user_id === store.state.currentUser.id
                    ? 'message message_outgoing-message'
                    : 'message',
            classNameDate:
                props.user_id === store.state.currentUser.id
                    ? 'message__date message__date_outgoing-message'
                    : 'message__date',
            id: props.id,
            chat_id: props.chat_id,
            user_id: props.user_id,
            type: props.type,
            content: props.content,
            file: props.file,
            time: formatDate(props.time),
            avatar: props.avatar ?? defaultAvatar,
            formattedDate: props.time,
        });
    }

    render() {
        return compile(template, this.props);
    }
}
