import UserAPI from '../api/UserSearh';
import { router } from '../index';
import { hideSpinner, showSpinner } from '../utils/spinner';

const userApi = new UserAPI();

export interface IUserApiSearch {
    login: string;
}

export default class UserController {
    public search(data: IUserApiSearch) {
        showSpinner();
        return userApi
            .search(data)
            .then((xhr) => {
                return JSON.parse(xhr.response);
            })
            .catch((e) => {
                if (!e.response) {
                    Promise.reject(e);
                    return router.go('/500');
                }
            })
            .finally(() => {
                hideSpinner();
            });
    }
}
