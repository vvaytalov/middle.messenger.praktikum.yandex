import AuthAPI, { IAuthSignInApi, IAuthSignUpApi } from '../api/AuthApi';
import { router } from '../index';
import { hideSpinner, showSpinner } from '../utils/spinner';

const authApi = new AuthAPI();

export default class AuthControllers {
    public SignIn(user?: IAuthSignInApi) {
        showSpinner();
        return authApi
            .SignIn(user)
            .then((xhr) => {
                console.log(xhr);
                router.go('/');
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

    public SignUp(user?: IAuthSignUpApi) {
        showSpinner();
        return authApi
            .SignUp(user)
            .then((xhr) => {
                console.log(xhr);
                router.go('/sign-in');
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
