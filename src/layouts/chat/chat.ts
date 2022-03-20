import Block from '../../modules/Block';
import Input from '../../components/input/input';
import ChatHeader from '../../components/chat/chatHeader/chatHeader';
import MessageList from '../../components/chat/messageList/messageList';
import MessageInput from '../../components/chat/messageInput/messageInput';
import { compile } from '../../utils/templator';
import { template } from './chat.tmpl';
import Link from '../../components/link/link';
import Popup from '../../components/popup/popup';
import Button from '../../components/button/button';
import NewChatForm from '../../components/newChatForm/newChatForm';
import ChatCardList from '../../components/chat/chatListCard/chatListCard';
import UserList from '../../components/userList/userList';
import AddChatUserForm from '../../components/addChatUserForm/addChatUserForm';
import ChatController from '../../controllers/ChatControllers';
import UserController from '../../controllers/UserControllers';
import MessageController from '../../controllers/MessageWsController';
import { store } from '../../store';

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
                onEndList: (length) => {
                    console.log(length);
                },
            }),
            MessageInput: new MessageInput({
                onMessageSend: ({ message }) =>
                    MessageController.sendMessage(message),
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
            NewChatForm: new NewChatForm({
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
        MessageController.leave();
    }
}
