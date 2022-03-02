export default function validateForm(
    form: HTMLFormElement | null,
    cb?: (isValid: boolean) => void
) {
    if (!form) {
        throw new Error("Форма для валидации не найдена");
    }

    const isValid = form.checkValidity();

    if (!cb) {
        const submitButton: HTMLButtonElement | null =
            form.querySelector("[type=submit]");
        if (isValid && submitButton) {
            submitButton.disabled = false;
        } else if (submitButton) {
            submitButton.disabled = true;
        }
    } else {
        cb(isValid);
    }
}
