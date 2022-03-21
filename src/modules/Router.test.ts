import { expect } from 'chai';
import Block from './Block';
import Router from './Router';

describe('Router', () => {
    const router = new Router('.app');

    class Main extends Block {}
    class About extends Block {}
    class Profile extends Block {}

    let callbackCounter: number = 0;

    router
        .setUnprotectedPaths(['/about'])
        .onRoute(() => {
            callbackCounter += 1;
        })
        .use('/', Main)
        .use('/about', About)
        .use('/profile', Profile)
        .start();

    it('Смена роута', () => {
        router.go('/');
        router.go('/about');

        expect(router.history.length).to.eq(3);
    });

    it('Получение пути', () => {
        router.go('/profile');

        const { pathname } = router.currentRoute || {};

        expect(pathname).to.eq('/profile');
    });

    it('Вызов onRoute', () => {
        expect(callbackCounter).to.eq(3);
    });
});
