import AuthAPI, { IAuthSignInApi, IAuthSignUpApi } from '../api/AuthApi';
import { router } from '../index';
import { store } from '../store';
import { getErrorReason, handleError } from '../utils/handleError';
import { hideSpinner, showSpinner } from '../utils/spinner';

class AuthControllers {
    public SignIn(user?: IAuthSignInApi) {
        showSpinner();
        return AuthAPI.SignIn(user)
            .then(() => {
                router.go('/');
            })
            .catch((e) => {
                if (getErrorReason(e) !== 'Cookie is not valid') {
                    return handleError(e);
                }

                return AuthAPI.LogOut()
                    .catch(() => {})
                    .then(() => AuthAPI.SignIn(user))
                    .then(() => {
                        router.go('/');
                    })
                    .catch(handleError);
            })
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
                return true;
            })
            .catch((e) => {
                if (getErrorReason(e) === 'Cookie is not valid') {
                    router.go('/sign-in');
                    return false;
                }

                void Promise.resolve(handleError(e)).catch(() => {});
                router.go('/sign-in');
                return false;
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
