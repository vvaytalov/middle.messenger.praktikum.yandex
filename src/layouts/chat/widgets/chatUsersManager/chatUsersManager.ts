import AddChatUserForm from '../../../../components/addChatUserForm/addChatUserForm';
import Popup from '../../../../components/popup/popup';
import UserList from '../../../../components/userList/userList';
import Block from '../../../../modules/Block';
import { compile } from '../../../../modules/templator';
import { store } from '../../../../store';
import { getActiveChatId } from '../../../../utils/chatSelectors';
import { setChatModalState } from '../../../../utils/chatPageState';
import { showErrorToast } from '../../../../utils/toast';
import ChatUsersController from '../../lib/ChatUsersController';
import { template } from './chatUsersManager.tmpl';

export default class ChatUsersManager extends Block {
    constructor() {
        const usersController = new ChatUsersController();
        let addChatUserPopup: Popup;
        let deleteChatUserPopup: Popup;

        const addUserList = new UserList({
            users: [],
            onApply: (userIds) => {
                usersController.addUsers(userIds).then((isAdded) => {
                    if (isAdded) {
                        addChatUserPopup.hide();
                    }
                });
            },
        });

        const addChatUserForm = new AddChatUserForm({
            onSubmit: (formData) => {
                usersController.searchUsers(formData.login).then((users) => {
                    addUserList.setProps({
                        users,
                    });
                });
            },
        });

        addChatUserPopup = new Popup({
            classMix: 'add-contact-popup',
            title: 'Добавить пользователя',
            onOpen: () => {
                setChatModalState({ isAddUserOpen: true });
                usersController.resetSearch();
                addUserList.setProps({
                    users: [],
                    selectedUsers: [],
                });
            },
            onClose: () => {
                setChatModalState({ isAddUserOpen: false });
            },
        });

        const deleteUserList = new UserList({
            className: 'user-list',
            users: [],
            buttonLabel: 'Удалить',
            onApply: (userIds) => {
                if (!deleteUserList.props.users.length) {
                    showErrorToast('Выберите пользователя для удаления');
                    return;
                }

                usersController.deleteUsers(userIds).then((isDeleted) => {
                    if (isDeleted) {
                        deleteChatUserPopup.hide();
                    }
                });
            },
        });

        deleteChatUserPopup = new Popup({
            classMix: 'delete-contact-popup',
            title: 'Удалить пользователя',
            onOpen: () => {
                setChatModalState({ isDeleteUserOpen: true });
                deleteUserList.setProps({
                    users: [],
                    selectedUsers: [],
                });

                usersController.getUsersForDeletion().then((users) => {
                    deleteUserList.setProps({
                        users,
                    });
                });
            },
            onClose: () => {
                setChatModalState({ isDeleteUserOpen: false });
            },
        });

        super('div', {
            className: 'chat-page__users-manager',
            AddUserList: addUserList,
            AddChatUserForm: addChatUserForm,
            AddChatUserPopup: addChatUserPopup,
            DeleteChatUserPopup: deleteChatUserPopup,
            DeleteUserList: deleteUserList,
        });
    }

    public openAddUserPopup() {
        if (!getActiveChatId(store.state)) {
            showErrorToast('Сначала выберите чат');
            return;
        }
        this.props.AddChatUserPopup.show();
    }

    public openDeleteUserPopup() {
        if (!getActiveChatId(store.state)) {
            showErrorToast('Сначала выберите чат');
            return;
        }
        this.props.DeleteChatUserPopup.show();
    }

    render() {
        return compile(template, this.props);
    }
}
