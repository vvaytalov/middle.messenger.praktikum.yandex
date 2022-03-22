import AuthAPI, { IAuthSignInApi, IAuthSignUpApi } from '../api/AuthApi';
import { router } from '../index';
import { store } from '../store';
import { handleError } from '../utils/handleError';
import { hideSpinner, showSpinner } from '../utils/spinner';

class AuthControllers {
    public SignIn(user?: IAuthSignInApi) {
        showSpinner();
        return AuthAPI.SignIn(user)
            .then(() => {
                router.go('/');
            })
            .catch(handleError)
            .finally(() => {
                hideSpinner();
            });
    }

    public SignUp(user?: IAuthSignUpApi) {
        showSpinner();
        return AuthAPI.SignUp(user)
            .then(() => {
                router.go('/sign-in');
            })
            .catch(handleError)
            .finally(() => {
                hideSpinner();
            });
    }

    public CheckAuth() {
        return AuthAPI.CheckAuth()
            .then((user) => {
                store.setState({
                    currentUser: user,
                });
            })
            .catch((e) => {
                handleError(e);
                router.go('/sign-in');
            });
    }

    public LogOut() {
        return AuthAPI.LogOut().then(() => {
            localStorage.removeItem('last_select-chat_id');
            router.go('/sign-in');
        });
    }
}

export default new AuthControllers();
