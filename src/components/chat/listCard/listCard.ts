import Block from '../../../modules/Block';
import { compile } from '../../../utils/templator';
import { template } from './listCard.tmpl';
import ContactCard from '../cardContact/cardContact';

import './listCard.css';
interface IContactCardList {
    contacts: any[];
}

export default class ContactCardList extends Block {
    constructor(props: IContactCardList) {
        super('ul', {
            className: 'contact-card-list',
            ContactCard: props.contacts.map(
                (contact) => new ContactCard(contact),
            ),
        });
    }

    render() {
        return compile(template, this.props);
    }
}
