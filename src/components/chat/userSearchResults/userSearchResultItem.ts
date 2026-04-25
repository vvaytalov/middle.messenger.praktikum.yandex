import Block from '../../../modules/Block';
import { compile } from '../../../modules/templator';
import defaultAvatar from '../../../assets/img/noavatar.svg';
import env from '../../../utils/env';
import Button from '../../button/button';
import { template } from './userSearchResultItem.tmpl';

import './userSearchResults.css';

interface IUserSearchResultItem {
    id: number;
    login: string;
    avatar: string | null;
    display_name?: string | null;
    first_name?: string;
    second_name?: string;
    canAddToChat: boolean;
    onAddUser: (userId: number) => void;
}

export default class UserSearchResultItem extends Block {
    constructor(props: IUserSearchResultItem) {
        const fullName = [props.first_name, props.second_name]
            .filter(Boolean)
            .join(' ')
            .trim();

        super('li', {
            className: 'user-search-result',
            id: props.id,
            login: props.login,
            avatar: props.avatar
                ? env.HOST_RESOURCES + props.avatar
                : defaultAvatar,
            name: props.display_name || fullName || props.login,
            AddButton: new Button({
                label: props.canAddToChat
                    ? 'Добавить'
                    : 'Выберите чат',
                light: !props.canAddToChat,
                color: props.canAddToChat ? 'primary' : '',
                disabled: !props.canAddToChat,
                classMix: 'user-search-result__button',
                onClick: () => props.onAddUser(props.id),
            }),
        });
    }

    render() {
        return compile(template, this.props);
    }
}
