import Block from '../../../modules/Block';
import { compile } from '../../../utils/templator';
import { template } from './cardContact.tmpl';
import './cardContact.css';
import defaultIcon from '../../../assets/img/attach.svg';
interface IContactCard {
    id: string;
    updatedAt: string;
    avatar: string | null;
    name: string;
    isGroup?: boolean;
    lastMessage: string;
    ownerLastMessage: string;
    counterUnreadMessages: number;
    createdBy?: number;
    onClick?: (chatId: number) => void;
}

class ContactCard extends Block {
    constructor(props: IContactCard) {
        super('div', {
            className: 'contact-card',
            id: props.id,
            createdBy: props.createdBy,
            avatar: props.avatar ?? defaultIcon,
            name: props.name,
            lastMessage: props.lastMessage ? props.lastMessage : null,
            updatedAt: props.updatedAt,
            date: '01.01.2022',
            ownerLastMessage: props.ownerLastMessage,
            counterUnreadMessages: props.counterUnreadMessages,
            onClick: props.onClick,
            events: {
                click: () => this.props.onClick(this.props.id),
            },
        });
    }

    render() {
        return compile(template, {
            ...this.props,
            time: this.props.lastMessage?.time || null,
            formattedTime: this.props.lastMessage?.time || null,
        });
    }
}

export default ContactCard;
