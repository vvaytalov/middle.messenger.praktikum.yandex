function debounce(func: Function, time: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: unknown[]) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => func.call(this, ...args), time);
    };
}

export default debounce;
