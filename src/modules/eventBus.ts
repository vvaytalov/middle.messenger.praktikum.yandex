type ICallback = (...args: unknown[]) => unknown;

export default class EventBus {
    readonly listeners: Record<string, Function[]>;

    constructor() {
        // Для наполнения событиями
        this.listeners = {};
    }

    // Подписка на события
    on(event: string, callback: ICallback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    // Отписка от событий
    off(event: string, callback: ICallback) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            (listener) => listener !== callback
        );
    }

    // Отправка событий
    emit<T>(event: string, ...args: T[]) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach((listener) => listener(...args));
    }
}
