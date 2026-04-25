import { compile } from '../../../modules/templator';
import { template } from './messageList.tmpl';
import Block from '../../../modules/Block';
import Message from '../message/message';
import { IMessageListItem } from '../../../types/models';

import './messageList.css';
import debounce from '../../../utils/debounce';
interface IMessageList {
    messages: IMessageListItem[];
    onEndList?: (length: number) => void;
    onReply?: (messageId: number) => void;
    onEdit?: (messageId: number) => void;
    onDelete?: (messageId: number) => void;
    onForward?: (messageId: number) => void;
}

export default class MessageList extends Block {
    handleScrollWithDebounce: (evt: Event) => void;

    constructor(props: IMessageList) {
        super('ul', {
            className: 'message-list',
            Message,
            messages: props.messages,
            onEndList: props.onEndList,
            onReply: props.onReply,
            onEdit: props.onEdit,
            onDelete: props.onDelete,
            onForward: props.onForward,
            events: {
                scroll: (evt: Event) => this.handleScrollWithDebounce(evt),
            },
        });

        this.handleScrollWithDebounce = debounce.call(
            this,
            this.handleScroll,
            400,
        );
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll(evt: Event) {
        const list = evt.target as HTMLUListElement;
        if (list) {
            const isEndList =
                list.scrollTop <= -(list.scrollHeight - list.offsetHeight);
            if (isEndList && this.props?.onEndList) {
                this.props.onEndList(this.props.messages.length);
            }
        }
    }

    public scrollToLastMessage() {
        const list = this.getContent();
        list.scrollTo({
            top: list.scrollHeight,
        });
    }

    render() {
        return compile(template, this.props);
    }
}
