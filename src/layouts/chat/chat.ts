import Button from '../../components/button/button';
import ChatHeader from '../../components/chat/chatHeader/chatHeader';
import ChatCardList from '../../components/chat/chatListCard/chatListCard';
import MessageInput from '../../components/chat/messageInput/messageInput';
import MessageList from '../../components/chat/messageList/messageList';
import UserSearchResults from '../../components/chat/userSearchResults/userSearchResults';
import Input from '../../components/input/input';
import Link from '../../components/link/link';
import NewChat from '../../components/newChat/newChat';
import Popup from '../../components/popup/popup';
import Block from '../../modules/Block';
import { compile } from '../../modules/templator';
import { store } from '../../store';
import { IUser } from '../../types/models';
import { getActiveChatId, getChatSearchQuery } from '../../utils/chatSelectors';
import { setChatModalState } from '../../utils/chatPageState';
import { getMessageComposerState } from '../../utils/messageSelectors';
import { showErrorToast } from '../../utils/toast';
import { template } from './chat.tmpl';
import ChatPageController from './lib/ChatPageController';
import ChatMain from './widgets/chatMain/chatMain';
import ChatModals from './widgets/chatModals/chatModals';
import ChatSidebar from './widgets/chatSidebar/chatSidebar';
import ChatUsersManager from './widgets/chatUsersManager/chatUsersManager';

import './chat.css';

export default class Chat extends Block {
    private pageController: ChatPageController;

    constructor() {
        let pageController: ChatPageController;

        const searchInput = new Input({
            placeholder: 'Поиск',
            type: 'search',
            onInput: (value) => pageController.handleSearchInput(value),
        });

        const chatCardList = new ChatCardList({
            chats: store.state.chats,
            isLoading: store.state.isChatsLoading,
            hasQuery: false,
            onSelect: (chatId) => pageController.handleChatSelect(chatId),
            onDelete: (chatId) => pageController.handleDeleteChat(chatId),
        });

        const searchResults = new UserSearchResults({
            users: [],
            isLoading: false,
            hasQuery: false,
            canAddToChat: Boolean(getActiveChatId(store.state)),
            onAddUser: (userId) => {
                pageController
                    .handleAddUser(userId, searchResults.props.users as IUser[])
                    .then((users) => {
                        searchResults.setProps({
                            users,
                        });
                    })
                    .catch(() => {
                        showErrorToast('Не удалось добавить пользователя');
                    });
            },
        });

        const usersManager = new ChatUsersManager();

        const chatHeader = new ChatHeader({
            name: 'vvaytalov',
            onAddContact: () => usersManager.openAddUserPopup(),
            onRemoveContact: () => usersManager.openDeleteUserPopup(),
            onRemoveChat: () => pageController.handleRemoveActiveChat(),
        });

        const messageList = new MessageList({
            messages: [],
            onEndList: (length) => pageController.handleMessageListEnd(length),
            onReply: (messageId) => pageController.handleMessageReply(messageId),
            onEdit: (messageId) => pageController.handleMessageEdit(messageId),
            onDelete: (messageId) => pageController.handleMessageDelete(messageId),
            onForward: (messageId) => pageController.handleMessageForward(messageId),
        });

        const messageInput = new MessageInput({
            chatId: getActiveChatId(store.state),
            composer: getMessageComposerState(store.state),
            onMessageSend: ({ message }) => pageController.handleComposerSubmit(message),
            onCancelComposer: () => pageController.handleComposerCancel(),
        });

        const profileLink = new Link({
            to: '/profile',
            label: 'Профиль',
        });

        const newChatPopup = new Popup({
            classMix: 'new-chat-popup',
            title: 'Создать чат',
            onOpen: () => setChatModalState({ isNewChatOpen: true }),
            onClose: () => setChatModalState({ isNewChatOpen: false }),
        });

        const newChatButton = new Button({
            label: 'Новый чат',
            light: false,
            onClick: () => newChatPopup.show(),
        });

        const newChatForm = new NewChat({
            onSubmit: (formData) => {
                pageController.handleCreateChat(formData.title).then(() => {
                    newChatPopup.hide();
                });
            },
        });

        super('div', {
            className: 'chat-page',
            chats: store.state.chats,
            searchQuery: getChatSearchQuery(store.state),
            SearchInput: searchInput,
            SearchResults: searchResults,
            ChatCardList: chatCardList,
            ChatHeader: chatHeader,
            MessageList: messageList,
            MessageInput: messageInput,
            Link: profileLink,
            NewChatPopup: newChatPopup,
            NewChatButton: newChatButton,
            NewChatForm: newChatForm,
            UsersManager: usersManager,
            Sidebar: new ChatSidebar({
                SearchInput: searchInput,
                SearchResults: searchResults,
                ChatCardList: chatCardList,
                Link: profileLink,
                NewChatButton: newChatButton,
            }),
            Main: new ChatMain({
                ChatHeader: chatHeader,
                MessageList: messageList,
                MessageInput: messageInput,
            }),
            Modals: new ChatModals({
                UsersManager: usersManager,
                NewChatPopup: newChatPopup,
                NewChatForm: newChatForm,
            }),
        });

        pageController = new ChatPageController({
            getSearchQuery: () => String(this.props.searchQuery || ''),
            setSearchQuery: (value) => {
                this.props.searchQuery = value;
            },
            setChatListState: (state) => {
                this.props.ChatCardList.setProps(state);
            },
            setUserSearchState: (state) => {
                this.props.SearchResults.setProps(state);
            },
            setMessageListState: (messages) => {
                this.props.MessageList.setProps({ messages });
            },
            setMessageInputChatId: (chatId) => {
                if (this.props.MessageInput.props.chatId !== chatId) {
                    this.props.MessageInput.setProps({ chatId });
                }
            },
            setMessageComposerState: (composer) => {
                this.props.MessageInput.setProps({
                    composer,
                });
            },
            scrollToLastMessage: () => {
                this.props.MessageList.scrollToLastMessage();
            },
        });
        this.pageController = pageController;
        this.pageController.mount();
    }

    render() {
        return compile(template, this.props);
    }

    onDestroy() {
        this.pageController?.destroy();
    }
}
