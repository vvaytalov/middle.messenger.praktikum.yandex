import UserAPI from '../api/UserSearch';
import { handleError } from '../utils/handleError';
export interface IUserApiSearch {
    login: string;
}

class UserController {
    public search(data: IUserApiSearch) {
        return UserAPI.search(data)
            .then((xhr) => {
                return JSON.parse(xhr.response);
            })
            .catch(handleError);
    }
}

export default new UserController();
