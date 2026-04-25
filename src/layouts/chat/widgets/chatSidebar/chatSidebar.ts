import Block from '../../../../modules/Block';
import { compile } from '../../../../modules/templator';
import { template } from './chatSidebar.tmpl';

interface IChatSidebarProps {
    SearchInput: Block;
    SearchResults: Block;
    ChatCardList: Block;
    Link: Block;
    NewChatButton: Block;
}

export default class ChatSidebar extends Block {
    constructor(props: IChatSidebarProps) {
        super('aside', {
            className: 'chat-page__side-panel',
            SearchInput: props.SearchInput,
            SearchResults: props.SearchResults,
            ChatCardList: props.ChatCardList,
            Link: props.Link,
            NewChatButton: props.NewChatButton,
        });
    }

    render() {
        return compile(template, this.props);
    }
}
