import AuthSignUpApi, { IAuthSignUpApi } from '../api/AuthSignUpApi';
import { router } from '../index';
import { hideSpinner, showSpinner } from '../utils/spinner';

const authSignUpApi = new AuthSignUpApi();

export default class AuthSignUpControllers {
    public SignIn(user?: IAuthSignUpApi) {
        showSpinner();
        return authSignUpApi
            .request(user)
            .then((xhr) => {
                console.log(xhr);
                router.go('/');
            })
            .catch((e) => {
                Promise.reject(e);
            })
            .finally(() => {
                hideSpinner();
            });
    }
}
