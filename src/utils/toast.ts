import toastContainer from '../components/toast/toast';

type ToastType = 'success' | 'error' | 'info';

let toastId = 0;

export function initToasts() {
    if (!document.body.contains(toastContainer.getContent())) {
        document.body.append(toastContainer.getContent());
    }
}

export function showToast(
    message: string,
    type: ToastType = 'info',
    timeout = 3000,
) {
    if (!message) {
        return;
    }

    initToasts();

    const id = ++toastId;
    toastContainer.addToast({
        id,
        type,
        message,
    });

    window.setTimeout(() => {
        toastContainer.removeToast(id);
    }, timeout);
}

export function showSuccessToast(message: string, timeout?: number) {
    showToast(message, 'success', timeout);
}

export function showErrorToast(message: string, timeout?: number) {
    showToast(message, 'error', timeout);
}

export function showInfoToast(message: string, timeout?: number) {
    showToast(message, 'info', timeout);
}
