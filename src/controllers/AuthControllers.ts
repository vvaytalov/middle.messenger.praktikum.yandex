import AuthAPI, { IAuthSignInApi, IAuthSignUpApi } from '../api/AuthApi';
import { router } from '../index';
import { hideSpinner, showSpinner } from '../utils/spinner';

class AuthControllers {
    public SignIn(user?: IAuthSignInApi) {
        showSpinner();
        return AuthAPI.SignIn(user)
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
        return AuthAPI.SignUp(user)
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

export default new AuthControllers();
