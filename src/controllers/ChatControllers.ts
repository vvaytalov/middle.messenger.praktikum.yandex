import ChatApi, { IChatApiCreate } from '../api/ChatApi';
import { router } from '../index';
import { chatStore } from '../stores/chatStore';
import { hideSpinner, showSpinner } from '../utils/spinner';
class ChatController {
    public create(data: IChatApiCreate) {
        showSpinner();
        return ChatApi.create(data)
            .then((xhr) => {
                return JSON.parse(xhr.response);
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

    public request() {
        showSpinner();
        return ChatApi.request()
            .then((xhr) => {
                const response = JSON.parse(xhr.response);
                chatStore.setState({
                    chats: response,
                });
                return JSON.parse(xhr.response);
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

export default new ChatController();
