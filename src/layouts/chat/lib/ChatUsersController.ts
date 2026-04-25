import { ChatController, UserController } from '../../../controllers';
import { store } from '../../../store';
import { IUser } from '../../../types/models';
import { getActiveChatId } from '../../../utils/chatSelectors';
import {
    showErrorToast,
    showInfoToast,
    showSuccessToast,
} from '../../../utils/toast';

export default class ChatUsersController {
    private lastSearchLogin = '';

    public resetSearch() {
        this.lastSearchLogin = '';
    }

    public searchUsers(login: string, notifyIfEmpty: boolean = true) {
        const normalizedLogin = login.trim();
        this.lastSearchLogin = normalizedLogin;

        return UserController.search({
            login: normalizedLogin,
        }).then((users: IUser[]) => {
            if (notifyIfEmpty && !users.length) {
                showInfoToast('Совпадений не найдено');
            }

            return users;
        });
    }

    public addUsers(userIds: number[]) {
        const chatId = this.getActiveChatId();

        if (!chatId) {
            return Promise.resolve(false);
        }

        if (userIds.length > 0) {
            return ChatController.addUserChat({
                users: userIds,
                chatId,
            }).then(() => {
                showSuccessToast('Пользователь добавлен в чат');
                return true;
            });
        }

        if (!this.lastSearchLogin) {
            showErrorToast('Введите логин пользователя');
            return Promise.resolve(false);
        }

        return this.searchUsers(this.lastSearchLogin, false).then((users) => {
            if (!users.length) {
                showErrorToast('Пользователь не найден');
                return false;
            }

            return ChatController.addUserChat({
                users: [users[0].id],
                chatId,
            }).then(() => {
                showSuccessToast('Пользователь добавлен в чат');
                return true;
            });
        });
    }

    public getUsersForDeletion() {
        const chatId = this.getActiveChatId();

        if (!chatId) {
            return Promise.resolve([] as IUser[]);
        }

        return ChatController.requestUserChat(chatId).then((users: IUser[]) => {
            const usersToRemove = users.filter(
                (user) => user.id !== store.state.currentUser?.id,
            );

            if (!usersToRemove.length) {
                showInfoToast('В этом чате больше некого удалять');
            }

            return usersToRemove;
        });
    }

    public deleteUsers(userIds: number[]) {
        const chatId = this.getActiveChatId();

        if (!chatId) {
            return Promise.resolve(false);
        }

        if (!userIds.length) {
            showErrorToast('Выберите пользователя для удаления');
            return Promise.resolve(false);
        }

        return ChatController.deleteUserChat({
            users: userIds,
            chatId,
        }).then(() => {
            showSuccessToast('Пользователь удален из чата');
            return true;
        });
    }

    private getActiveChatId() {
        const activeChatId = getActiveChatId(store.state);

        if (!activeChatId) {
            showErrorToast('Сначала выберите чат');
            return null;
        }

        return activeChatId;
    }
}
