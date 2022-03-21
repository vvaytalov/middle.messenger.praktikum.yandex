import AddChatUserForm from '../../components/addChatUserForm/addChatUserForm';
import Button from '../../components/button/button';
import ChatHeader from '../../components/chat/chatHeader/chatHeader';
import ChatCardList from '../../components/chat/chatListCard/chatListCard';
import MessageInput from '../../components/chat/messageInput/messageInput';
import MessageList from '../../components/chat/messageList/messageList';
import Input from '../../components/input/input';
import Link from '../../components/link/link';
import Popup from '../../components/popup/popup';
import UserList from '../../components/userList/userList';
import {
    ChatController,
    MessageController,
    UserController,
} from '../../controllers/index';
import Block from '../../modules/Block';
import { compile } from '../../modules/templator';
import { store } from '../../store';
import { template } from './chat.tmpl';
import newChat from '../../components/newChat/newChat';

import './chat.css';
export default class Chat extends Block {
    constructor() {
        super('div', {
            className: 'chat-page',
            chats: store.state.chats,
            SearchInput: new Input({
                placeholder: 'Поиск',
                type: 'search',
            }),
            ChatCardList: new ChatCardList({
                chats: store.state.chats,
                onSelect: (chatId) => {
                    store.setState({ messages: [] });
                    MessageController.leave();
                    store.setState({ chatId });
                    localStorage.setItem('last_select-chat_id', `${chatId}`),
                        this.reqChat(chatId);
                },
            }),
            ChatHeader: new ChatHeader({
                name: 'vvaytalov',
                onAddContact: () => {
                    this.props.AddChatUserPopup.show();
                },
                onRemoveContact: () => this.props.DeleteChatUserPopup.show(),
                onRemoveChat: () => ChatController.removeChat(),
            }),
            MessageList: new MessageList({
                messages: [],
            }),
            MessageInput: new MessageInput({
                onMessageSend: ({ message }) => {
                    MessageController.sendMessage(message),
                        this.props.MessageList.scrollToLastMessage();
                },
            }),
            Link: new Link({
                to: '/profile',
                label: 'Профиль',
            }),
            NewChatPopup: new Popup({
                classMix: 'new-chat-popup',
                title: 'Создать чат',
            }),
            NewChatButton: new Button({
                label: 'Новый чат',
                light: false,
                onClick: () => this.props.NewChatPopup.show(),
            }),
            NewChatForm: new newChat({
                onSubmit: (formData) => {
                    ChatController.create({
                        title: formData.title,
                    }).then(() => this.props.NewChatPopup.hide());
                },
            }),
            selectedUsers: [],
            AddUserList: new UserList({
                users: [],
                onApply: (userId) => {
                    ChatController.addUserChat({
                        users: userId,
                        chatId: store.state.chatId,
                    });
                },
            }),
            AddChatUserForm: new AddChatUserForm({
                onSubmit: (formData) => {
                    UserController.search({
                        login: formData.login,
                    }).then((users) => {
                        this.props.AddUserList.setProps({
                            users,
                        });
                    });
                },
            }),
            AddChatUserPopup: new Popup({
                classMix: 'add-contact-popup',
                title: 'Добавить пользователя',
                onOpen: () => {
                    this.props.AddUserList.setProps({
                        users: [],
                        selectedUsers: [],
                    });
                },
            }),

            DeleteChatUserPopup: new Popup({
                classMix: 'delete-contact-popup',
                title: 'Удалить пользователя',
                onOpen: () => {
                    this.props.DeleteUserList.setProps({
                        users: [],
                        selectedUsers: [],
                    });
                    ChatController.requestUserChat(store.state.chatId).then(
                        (users) => {
                            const usersRemove = users.filter((user: any) => {
                                return user.id !== store.state.currentUser.id;
                            });
                            this.props.DeleteUserList.setProps({
                                users: usersRemove,
                            });
                        }
                    );
                },
            }),

            DeleteUserList: new UserList({
                className: 'user-list',
                users: [],
                buttonLabel: 'Удлаить',
                onApply: (userId) => {
                    if (!this.props.DeleteUserList.props.users.length) {
                        return;
                    }
                    ChatController.deleteUserChat({
                        users: userId,
                        chatId: store.state.chatId,
                    });
                    this.props.DeleteChatUserPopup.hide();
                },
            }),
        });
    }

    public reqMessage(token: any = store.state.token): void {
        MessageController.connect({
            userId: store.state.currentUser.id,
            chatId: store.state.chatId,
            token,
        });
    }

    public reqChat(chatId: number): void {
        if (!chatId) {
            return;
        }

        ChatController.requestMessageToken(chatId).then(({ token }) => {
            store.setState({ chatId });
            this.reqMessage(token);
        });
    }

    componentDidMount() {
        const getChat = localStorage.getItem('last_select-chat_id');

        if (getChat) {
            store.setState({
                chatId: +getChat,
            });
        }

        ChatController.request().then(() => {
            this.reqChat(store.state.chatId);
        });

        store.subscribe((state) => {
            this.props.ChatCardList.setProps({
                chats: state.chats,
            });
        });

        store.subscribe((state) => {
            this.props.MessageList.setProps({
                messages: state.messages,
            });
        });
    }

    render() {
        return compile(template, this.props);
    }

    onDestroy() {
        if (store.state.chats.length) {
            MessageController.leave();
        }
        store.setState({
            chats: [],
            messages: [],
        });
    }
}
