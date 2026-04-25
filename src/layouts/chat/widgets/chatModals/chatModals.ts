import Block from '../../../../modules/Block';
import { compile } from '../../../../modules/templator';
import { template } from './chatModals.tmpl';

interface IChatModalsProps {
    UsersManager: Block;
    NewChatPopup: Block;
    NewChatForm: Block;
}

export default class ChatModals extends Block {
    constructor(props: IChatModalsProps) {
        super('div', {
            className: 'chat-page__modals',
            UsersManager: props.UsersManager,
            NewChatPopup: props.NewChatPopup,
            NewChatForm: props.NewChatForm,
        });
    }

    render() {
        return compile(template, this.props);
    }
}
