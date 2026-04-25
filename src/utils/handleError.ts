import { router } from '../index';
import { showErrorToast } from './toast';

export function handleError(error: XMLHttpRequest) {
    if (!error || !error.response) {
        showErrorToast('Что-то пошло не так. Открываем страницу ошибки');
        return router.go('/500');
    }

    let reason = '';
    try {
        const parsed = JSON.parse(error.response);
        reason = parsed.reason || '';
    } catch {
        reason = error.response;
    }

    if (reason === 'User already in system') {
        router.go('/');
        return;
    }

    showErrorToast(reason || 'Произошла ошибка');
    return Promise.reject(error);
}
