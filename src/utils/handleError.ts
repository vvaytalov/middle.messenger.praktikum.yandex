import { router } from '../index';
import { showErrorToast } from './toast';

export function getErrorReason(error: XMLHttpRequest) {
    if (!error || !error.response) {
        return '';
    }

    try {
        const parsed = JSON.parse(error.response);
        return parsed.reason || '';
    } catch {
        return error.response;
    }
}

export function handleError(error: XMLHttpRequest) {
    if (!error || !error.response) {
        showErrorToast('Что-то пошло не так. Открываем страницу ошибки');
        return router.go('/500');
    }

    const reason = getErrorReason(error);

    if (reason === 'User already in system') {
        router.go('/');
        return;
    }

    showErrorToast(reason || 'Произошла ошибка');
    return Promise.reject(error);
}
