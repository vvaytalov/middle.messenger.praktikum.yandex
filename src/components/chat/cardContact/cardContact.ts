import Block from '../../../modules/Block';
import { compile } from '../../../utils/templator';
import { template } from './cardContact.tmpl';
import './cardContact.css';

interface IContactCard {
    id: string;
    updatedAt: string;
    avatar: string | null;
    name: string;
    isGroup: boolean;
    lastMessage: string;
    ownerLastMessage: string;
    counterUnreadMessages: number;
}

class ContactCard extends Block {
    constructor(props: IContactCard) {
        super('div', {
            className: 'contact-card',
            avatar: props.avatar ?? '',
            name: props.name,
            lastMessage: props.lastMessage,
            updatedAt: props.updatedAt,
            date: '01.01.2022',
            id: props.id,
            ownerLastMessage: props.ownerLastMessage,
            counterUnreadMessages: props.counterUnreadMessages,
        });
    }

    render() {
        return compile(template, this.props);
    }
}

export default ContactCard;
