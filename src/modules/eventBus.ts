type ICallback = (...args: unknown[]) => unknown;

export default class EventBus {
    readonly listeners: Record<string, Function[]>;

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: ICallback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: ICallback) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            (listener) => listener !== callback
        );
    }

    emit<T>(event: string, ...args: T[]) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach((listener) => listener(...args));
    }
}
