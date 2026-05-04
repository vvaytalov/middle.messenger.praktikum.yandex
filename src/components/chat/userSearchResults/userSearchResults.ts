import Block from '../../../modules/Block';
import { compile } from '../../../modules/templator';
import UserSearchResultItem from './userSearchResultItem';
import { template } from './userSearchResults.tmpl';
import { IUser } from '../../../types/models';

import './userSearchResults.css';

interface IUserSearchResultsProps {
    users: IUser[];
    isLoading?: boolean;
    hasQuery?: boolean;
    canAddToChat?: boolean;
    onAddUser: (userId: number) => void;
}

export default class UserSearchResults extends Block {
    constructor(props: IUserSearchResultsProps) {
        super('div', {
            className: 'user-search-results',
            classNameRoot: 'user-search-results',
            users: props.users,
            isLoading: props.isLoading ?? false,
            hasQuery: props.hasQuery ?? false,
            canAddToChat: props.canAddToChat ?? false,
            onAddUser: props.onAddUser,
            UserResultItem: props.users.map(
                (user) =>
                    new UserSearchResultItem({
                        ...user,
                        canAddToChat: props.canAddToChat ?? false,
                        onAddUser: props.onAddUser,
                    }),
            ),
        });
    }

    render() {
        const users = this.props.users || [];
        const classNameRoot =
            this.props.hasQuery || this.props.isLoading || users.length
                ? 'user-search-results'
                : 'user-search-results user-search-results_hidden';
        const UserResultItem = users.map(
            (user: IUser) =>
                new UserSearchResultItem({
                    ...user,
                    canAddToChat: this.props.canAddToChat,
                    onAddUser: this.props.onAddUser,
                }),
        );

        return compile(template, {
            ...this.props,
            classNameRoot,
            UserResultItem,
        });
    }
}
