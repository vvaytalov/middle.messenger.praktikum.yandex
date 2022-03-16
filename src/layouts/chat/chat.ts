import Block from '../../modules/Block';
import Input from '../../components/input/input';
import ChatHeader from '../../components/chat/chatHeader/chatHeader';
import MessageList from '../../components/chat/messageList/messageList';
import MessageInput from '../../components/chat/messageInput/messageInput';
import { messages } from './mock/mock';
import { compile } from '../../utils/templator';
import { template } from './chat.tmpl';
import Link from '../../components/link/link';
import Popup from '../../components/popup/popup';
import Button from '../../components/button/button';
import NewChatForm from '../../components/newChatForm/newChatForm';
import { chatStore } from '../../stores/chatStore';
import { chatController, userController } from '../../controllers/index';
import ChatCardList from '../../components/chat/chatListCard/chatListCard';
import UserList from '../../components/userList/userList';
import AddChatUserForm from '../../components/addChatUserForm/addChatUserForm';

import './chat.css';

export default class Chat extends Block {
    constructor() {
        super('div', {
            className: 'chat-page',
            chats: chatStore.state.chats,
            SearchInput: new Input({
                placeholder: 'Поиск',
                type: 'search',
                onInput: (value) => console.log('Поле поиска:', value),
            }),
            ChatCardList: new ChatCardList({
                chats: chatStore.state.chats,
            }),
            ChatHeader: new ChatHeader({
                name: 'vvaytalov',
                onAddContact: () => {
                    this.props.AddChatUserPopup.show();
                },
                onRemoveContact: () => console.log('Удалить чат'),
            }),
            MessageList: new MessageList({
                messages,
            }),
            MessageInput: new MessageInput({
                onMessageInput: (value) =>
                    console.log('Ввод нового сообщения', value),
                onMessageSend: (formData) => console.log(formData),
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
                    chatController
                        .create({
                            title: formData.title,
                        })
                        .then(() => this.props.NewChatPopup.hide());

                    console.log(formData);
                },
            }),
            UserList: new UserList({
                users: [],
            }),
            AddChatUserForm: new AddChatUserForm({
                onSubmit: (formData) => {
                    userController
                        .search({
                            login: formData.login,
                        })
                        .then((res) => {
                            console.log(res);
                            this.props.UserList.setProps({
                                users: res,
                            });
                        });
                    console.log(formData);
                },
            }),
            AddChatUserPopup: new Popup({
                classMix: 'add-contact-popup',
                title: 'Добавить пользователя',
                onOpen: () => {
                    this.props.UserList.setProps({
                        users: [],
                    });
                },
            }),
        });
    }

    public componentDidMount(): void {
        chatController.request();
        chatStore.subscribe((state) => {
            this.props.ChatCardList.setProps({
                chats: state.chats,
            });
        });
    }

    render() {
        return compile(template, this.props);
    }
}
