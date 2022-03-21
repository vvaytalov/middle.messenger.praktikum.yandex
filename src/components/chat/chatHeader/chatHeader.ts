import { compile } from '../../../utils/templator';
import { template } from './chatHeader.tmpl';
import defaultAvatar from '../../../assets/img/noavatar.svg';
import Block from '../../../modules/Block';
import moreIcon from '../../../assets/img/more.svg';
import addContactIcon from '../../../assets/img/addUser.png';
import removeContactIcon from '../../../assets/img/delUser.png';
import trashIcon from '../../../assets/img/trash.svg';
import DropDownMenu from '../../dropDown/DropDownMenu';

import './chatHeader.css';
import { store } from '../../../store';

interface IChatHeader {
    name: string;
    avatar?: string | null;
    onAddContact: () => void;
    onRemoveContact: () => void;
    onRemoveChat: () => void;
}

class ChatHeader extends Block {
    constructor(props: IChatHeader) {
        super('div', {
            className: 'chat-header',
            avatar: props.avatar ?? defaultAvatar,
            name: '',
            ContactMenu: new DropDownMenu({
                classMix: 'more-menu',
                icon: moreIcon,
                title: 'Управление пользователями',
                style: {
                    top: '32px',
                    right: '0',
                    'z-index': '1',
                },
                items: [
                    {
                        icon: addContactIcon,
                        label: 'Добавить пользователя',
                        onClick: props.onAddContact,
                    },
                    {
                        icon: removeContactIcon,
                        label: 'Удалить пользователя',
                        onClick: props.onRemoveContact,
                    },
                    {
                        icon: trashIcon,
                        label: 'Удалить чат',
                        onClick: props.onRemoveChat,
                    },
                ],
            }),
        });
    }

    public componentDidMount(): void {
        store.subscribe((state) => {
            this.props.name =
                state.chats.find((chat: any) => chat.id === state?.chatId)
                    ?.title || 'Выберете или создайте чат';
        });
    }

    render() {
        return compile(template, this.props);
    }
}

export default ChatHeader;
