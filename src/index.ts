import SignInPage from './layouts/auth/SignIn/SignIn';
import SignUpPage from './layouts/auth/SignUp/SignUp';
import Chat from './layouts/chat/chat';
import Error404Page from './layouts/error/404/404';
import Error500Page from './layouts/error/500/500';
import ChangePassword from './layouts/profile/change_password/change_password';
import Profile from './layouts/profile/user_page/user_page';
import Router from './modules/Router';

export const router = new Router('.body');

router
    .setUnprotectedPaths(['/sign-in', '/sign-up', '/500'])
    .use('/', Chat)
    .use('/profile', Profile)
    .use('/sign-in', SignInPage)
    .use('/sign-up', SignUpPage)
    .use('/change_password', ChangePassword)
    .use('/500', Error500Page)
    .use('*', Error404Page)
    .start();
