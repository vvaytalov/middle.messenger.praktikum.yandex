import { template } from './UserList.tmpl';
import Block from '../../modules/Block';
import { compile } from '../../utils/templator';
import User from '../user/user';
import Button from '../button/button';
import './userList.css';

interface IUserList {
    className?: string;
    users: unknown[];
    onAdd: (usersId: number[]) => void;
}

class UserList extends Block {
    constructor(props: IUserList) {
        super('ul', {
            className: 'user-list',
            classNameRoot: 'user-list chat-page__user-list',
            users: props.users,
            selectedUsers: [],
            onAdd: props.onAdd,
            onSelect: (userId: number) => {
                if (this.props.selectedUsers.includes(userId)) {
                    const updatedSelectedUsers = [...this.props.selectedUsers];
                    const userIndex = updatedSelectedUsers.findIndex(
                        (user) => user === userId
                    );
                    updatedSelectedUsers.splice(userIndex, 1);
                    this.props.selectedUsers = updatedSelectedUsers;
                    return;
                }
                this.props.selectedUsers = [
                    ...this.props.selectedUsers,
                    userId,
                ];
            },
            ButtonAdd: new Button({
                label: 'Добавить',
                color: 'primary',
                classMix: 'add-button',
                onClick: () => {
                    this.props.onAdd(this.props.selectedUsers);
                },
            }),
            User,
        });
    }

    render() {
        return compile(template, this.props);
    }
}

export default UserList;
