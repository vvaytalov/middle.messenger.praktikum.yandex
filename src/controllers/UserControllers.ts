import UserAPI from '../api/UserSearch';
import { store } from '../store';
import { handleError } from '../utils/handleError';
import { hideSpinner, showSpinner } from '../utils/spinner';
export interface IUserApiSearch {
    login: string;
}

export interface IUserApiUpdateProfile {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}
class UserController {
    public search(data: IUserApiSearch) {
        return UserAPI.search(data)
            .then((users) => {
                return users;
            })
            .catch(handleError);
    }

    public updateProfile(data: IUserApiUpdateProfile) {
        showSpinner();
        return UserAPI.updateProfile(data)
            .then((user) => {
                return user;
            })
            .catch(handleError)
            .finally(() => {
                hideSpinner();
            });
    }

    public updateAvatar(data: FormData) {
        showSpinner();
        return UserAPI.updateAvatar(data)
            .then((user) => {
                store.setState({
                    currentUser: user,
                });
                return user;
            })
            .catch(handleError)
            .finally(() => {
                hideSpinner();
            });
    }
}

export default new UserController();
