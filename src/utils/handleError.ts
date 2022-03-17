import { router } from '../index';

export function handleError(error: XMLHttpRequest) {
    if (!error.response) {
        return router.go('/500');
    }
    const { reason } = JSON.parse(error.response);
    console.log(reason, 'error');
    return Promise.reject(error);
}
