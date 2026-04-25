import Block from '../../../../modules/Block';
import { compile } from '../../../../modules/templator';
import { template } from './chatMain.tmpl';

interface IChatMainProps {
    ChatHeader: Block;
    MessageList: Block;
    MessageInput: Block;
}

export default class ChatMain extends Block {
    constructor(props: IChatMainProps) {
        super('div', {
            className: 'chat-page__main',
            ChatHeader: props.ChatHeader,
            MessageList: props.MessageList,
            MessageInput: props.MessageInput,
        });
    }

    render() {
        return compile(template, this.props);
    }
}
