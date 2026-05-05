import { expect } from 'chai';
import Block from './Block';
import Router from './Router';

describe('Router', () => {
    const router = new Router('.app');

    class Main extends Block {}
    class About extends Block {}
    class Profile extends Block {}

    let callbackCounter: number = 0;
    const waitForRoute = () => new Promise((resolve) => {
        setTimeout(resolve, 0);
    });

    router
        .setUnprotectedPaths(['/about'])
        .onRoute(() => {
            callbackCounter += 1;
        })
        .use('/', Main)
        .use('/about', About)
        .use('/profile', Profile)
        .start();

    it('changes route', async () => {
        router.go('/');
        await waitForRoute();
        router.go('/about');
        await waitForRoute();

        expect(router.history.length).to.eq(3);
    });

    it('gets current path', async () => {
        router.go('/profile');
        await waitForRoute();

        const { pathname } = router.currentRoute || {};

        expect(pathname).to.eq('/profile');
    });

    it('calls onRoute for protected routes', async () => {
        await waitForRoute();

        expect(callbackCounter).to.eq(3);
    });
});
