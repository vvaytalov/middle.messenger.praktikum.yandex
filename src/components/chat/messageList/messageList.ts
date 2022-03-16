import { compile } from '../../../utils/templator';
import { template } from './messageList.tmpl';
import Block from '../../../modules/Block';
import Message from '../message/message';

import './messageList.css';
interface IMessageList {
    messages: any[];
}

export default class MessageList extends Block {
    constructor(props: IMessageList) {
        super('ul', {
            className: 'message-list',
            Message,
            messages: props.messages,
        });
    }

    render() {
        return compile(template, this.props);
    }
}
