import { assert } from 'chai';
import { compile } from './templator';

describe('Тест шаблонизатора', () => {
    it('Компиляция', () => {
        assert.equal(
            compile(() => `<div class='{{className}}'>{{user.name}}</div>`, {
                className: 'user',
                user: { name: 'vvaytalov' },
            }),
            `<div class='user'>vvaytalov</div>`
        );
    });
});
