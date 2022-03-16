import { compile } from '../../../utils/templator';
import { template } from './chatHeader.tmpl';
import defaultAvatar from '../../../assets/img/noavatar.svg';
import Block from '../../../modules/Block';
import moreIcon from '../../../assets/img/more.svg';
import addContactIcon from '../../../assets/img/add-contact.svg';
import trashIcon from '../../../assets/img/trash.svg';
import DropDownMenu from '../../dropDown/DropDownMenu';

import './chatHeader.css';

interface IChatHeader {
    name: string;
    avatar?: string | null;
    onAddContact: () => void;
    onRemoveContact: () => void;
}

class ChatHeader extends Block {
    constructor(props: IChatHeader) {
        super('div', {
            className: 'chat-header',
            avatar: props.avatar ?? defaultAvatar,
            name: props.name ?? '',
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
                        icon: trashIcon,
                        label: 'Удалить пользователя',
                        onClick: props.onRemoveContact,
                    },
                ],
            }),
        });
    }

    render() {
        return compile(template, this.props);
    }
}

export default ChatHeader;
