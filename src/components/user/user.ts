import { template } from './user.tmpl';
import defaultAvatar from '../../assets/img/noavatar.svg';
import Block from '../../modules/Block';
import { compile } from '../../modules/templator';
import env from '../../utils/env';
import './user.css';

interface IUser {
    id: number;
    login: string;
    email: string;
    avatar: string | null;
    first_name: string;
    second_name: string;
    display_name: string | null;
    phone: string;
    onClick: (userID: number) => void;
    selectedUsers: number[];
}

class User extends Block {
    constructor(props: IUser) {
        super('li', {
            className: 'user',
            classNameRoot: props.selectedUsers.includes(props.id)
                ? 'user user__active'
                : 'user',
            id: props.id,
            login: props.login,
            email: props.email,
            avatar: props.avatar
                ? env.HOST_RESOURCES + props.avatar
                : defaultAvatar,
            first_name: props.first_name,
            second_name: props.second_name,
            display_name: props.display_name,
            phone: props.phone,
            onClick: props.onClick,
            events: {
                click: () => this.props.onClick(this.props.id),
            },
        });
    }

    componentDidMount() {
        setTimeout(() => {
            const avatar: HTMLImageElement | null =
                this.getContent().querySelector('.avatar');
            if (avatar) {
                avatar.onerror = () => {
                    avatar.src = defaultAvatar;
                };
            }
        }, 0);
    }

    render() {
        return compile(template, this.props);
    }
}

export default User;
