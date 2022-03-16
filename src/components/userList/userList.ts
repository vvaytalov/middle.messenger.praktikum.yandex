import { template } from './UserList.tmpl';
import Block from '../../modules/Block';
import { compile } from '../../utils/templator';
import User from '../user/user';
import './userList.css';

interface IUserList {
    className?: string;
    users: unknown[];
}

class UserList extends Block {
    constructor(props: IUserList) {
        super('ul', {
            className: 'user-list chat-page__user-list',
            users: props.users,
            User,
        });
    }

    render() {
        console.log('render UserList', this.props.users);
        return compile(template, this.props);
    }
}

export default UserList;
