import AuthSignInApi, { IAuthSignInApi } from '../api/AuthSignInApi';
import { router } from '../index';
import { hideSpinner, showSpinner } from '../utils/spinner';

const authSignInApi = new AuthSignInApi();

export default class AuthSignInControllers {
    public SignIn(user?: IAuthSignInApi) {
        showSpinner();
        return authSignInApi
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
