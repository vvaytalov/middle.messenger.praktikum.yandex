import { compile } from '../../../utils/templator';
import { template } from './messageList.tmpl';
import Block from '../../../modules/Block';
import Message from '../message/message';

import './messageList.css';
import debounce from '../../../utils/debounce';
interface IMessageList {
    messages: any[];
    onEndList?: (length: number) => void;
}

export default class MessageList extends Block {
    handleScrollWithDebounce: (evt: Event) => void;

    constructor(props: IMessageList) {
        super('ul', {
            className: 'message-list',
            Message,
            messages: props.messages,
            onEndList: props.onEndList,
            events: {
                scroll: (evt: Event) => this.handleScrollWithDebounce(evt),
            },
        });

        this.handleScrollWithDebounce = debounce.call(
            this,
            this.handleScroll,
            200
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
        list.scrollTo({
            top: list.scrollHeight,
        });
    }

    render() {
        return compile(template, this.props);
    }
}
