function debounce(func: Function, time: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: unknown[]) {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => func.apply(this, args), time);
    };
}

export default debounce;
