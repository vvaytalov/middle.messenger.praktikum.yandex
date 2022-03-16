import UserAPI from '../api/UserSearh';
import { router } from '../index';
import { hideSpinner, showSpinner } from '../utils/spinner';
export interface IUserApiSearch {
    login: string;
}

class UserController {
    public search(data: IUserApiSearch) {
        showSpinner();
        return UserAPI.search(data)
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

export default new UserController();
