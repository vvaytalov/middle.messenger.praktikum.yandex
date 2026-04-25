import { expect } from 'chai';
import {
    applyHistoryMessages,
    prependRealtimeMessage,
    removeMessageById,
    replaceMessageById,
    updateMessageById,
} from './messageState';

const baseMessage = {
    avatar: null,
    chat_id: 10,
    content: 'hello',
    file: null,
    id: 1,
    is_read: false,
    time: '2026-04-25T00:00:00.000Z',
    type: 'message',
    user_id: 7,
};

describe('messageState utils', () => {
    it('дедуплицирует историю по id', () => {
        const nextMessages = applyHistoryMessages(
            [baseMessage],
            [baseMessage, { ...baseMessage, id: 2 }],
        );

        expect(nextMessages).to.have.length(2);
        expect(nextMessages.map((message) => message.id)).to.deep.equal([1, 2]);
    });

    it('обновляет сообщение по id без пересборки вручную', () => {
        const nextMessages = updateMessageById(
            [baseMessage],
            1,
            { content: 'edited', pending_action: 'edit' },
        );

        expect(nextMessages[0].content).to.equal('edited');
        expect(nextMessages[0].pending_action).to.equal('edit');
    });

    it('заменяет и удаляет сообщение по id', () => {
        const replacedMessages = replaceMessageById(
            [baseMessage, { ...baseMessage, id: 2 }],
            2,
            { ...baseMessage, id: 2, content: 'replacement' },
        );
        const nextMessages = removeMessageById(replacedMessages, 1);

        expect(nextMessages).to.have.length(1);
        expect(nextMessages[0].content).to.equal('replacement');
    });

    it('добавляет realtime сообщение в начало списка', () => {
        const nextMessages = prependRealtimeMessage(
            [baseMessage],
            { ...baseMessage, id: 3, content: 'newest' },
        );

        expect(nextMessages[0].id).to.equal(3);
    });
});
