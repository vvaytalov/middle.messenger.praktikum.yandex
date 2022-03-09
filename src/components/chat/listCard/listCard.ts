import Block from '../../../modules/Block';
import { compile } from '../../../utils/templator';
import { template } from './listCard.tmpl';
import ContactCard from '../cardContact/cardContact';

import './listCard.css';
interface IContactCardList {
    contacts: IContact[];
}
interface IContact {
    id: string;
    name: string;
    lastMessage: string;
    ownerLastMessage: string;
    counterUnreadMessages: number;
    avatar: string | null;
    updatedAt: string;
    isGroup: boolean;
}

export default class ContactCardList extends Block {
    constructor(props: IContactCardList) {
        super('ul', {
            className: 'contact-card-list',
            ContactCard: props.contacts.map(
                (contact) => new ContactCard(contact)
            ),
        });
    }

    render() {
        return compile(template, this.props);
    }
}
