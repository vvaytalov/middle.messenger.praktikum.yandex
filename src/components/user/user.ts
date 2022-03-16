import { template } from './user.tmpl';
import defaultAvatar from '../../assets/img/noavatar.svg';
import Block from '../../modules/Block';
import { compile } from '../../utils/templator';
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
}

class User extends Block {
    constructor(props: IUser) {
        super('li', {
            className: 'user',
            id: props.id,
            login: props.login,
            email: props.email,
            avatar: props.avatar
                ? 'https://ya-praktikum.tech/api/v2/resources' + props.avatar
                : defaultAvatar,
            first_name: props.first_name,
            second_name: props.second_name,
            display_name: props.display_name,
            phone: props.phone,
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
