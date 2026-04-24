import { router } from '../index';

export function handleError(error: XMLHttpRequest) {
    if (!error || !error.response) {
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

    console.error('[handleError]', reason);
    return Promise.reject(error);
}
