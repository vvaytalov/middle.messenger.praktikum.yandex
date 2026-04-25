import EventBus from './eventBus';

export type IState = Record<string, any>;

export default class Store<TState extends IState = IState> {
    public state: TState;
    private subscribers: Function[];
    private _meta: {
        state: TState;
    };

    private _isBatching: boolean;

    private eventBus: () => EventBus;

    static EVENTS = {
        INIT: 'init',
        FLOW_SDM: 'flow:store-did-mount',
        FLOW_SDU: 'flow:store-did-update',
        FLOW_USE: 'flow:use',
    };

    constructor(initialState: TState) {
        const eventBus = new EventBus();

        this._meta = {
            state: initialState,
        };

        this._isBatching = false;
        this.state = this._makeStateProxy(initialState);
        this.subscribers = [];
        this.eventBus = () => eventBus;
        this._registerLifecycleEvents(eventBus);
        eventBus.emit(Store.EVENTS.INIT);
    }

    private _registerLifecycleEvents(eventBus: EventBus) {
        eventBus.on(Store.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Store.EVENTS.FLOW_SDM, this._storeDidMount.bind(this));
        eventBus.on(Store.EVENTS.FLOW_SDU, this._storeDidUpdate.bind(this));
        eventBus.on(Store.EVENTS.FLOW_USE, this._use.bind(this));
    }

    private _init() {
        this.eventBus().emit(Store.EVENTS.FLOW_SDM);
    }

    private _storeDidMount() {
        this.storeDidMount();
    }

    public storeDidMount() {}

    private _storeDidUpdate(oldState: TState, newState: TState) {
        const response = this.storeDidUpdate(oldState, newState);
        if (response) {
            this.eventBus().emit(Store.EVENTS.FLOW_USE);
        }
    }

    public storeDidUpdate(oldState?: TState, newState?: TState) {
        return oldState !== newState;
    }

    private _use() {
        this.subscribers.forEach((subscriber) => {
            subscriber(this.state);
        });
    }

    public subscribe(subscriber: (state: TState) => void) {
        this.subscribers.push(subscriber);
        subscriber(this.state);
        // Return unsubscribe function
        return () => {
            this.subscribers = this.subscribers.filter((s) => s !== subscriber);
        };
    }

    public setState(nexIState: Partial<TState>) {
        if (!nexIState) {
            return;
        }
        // Batch updates: set flag to skip proxy notifications during assign
        this._isBatching = true;
        const keys = Object.keys(nexIState) as Array<keyof TState>;
        // Apply all properties except the last one silently
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            this.state[key] = nexIState[key] as TState[typeof key];
        }
        // Release batch before last property so Proxy triggers once
        this._isBatching = false;
        if (keys.length > 0) {
            const lastKey = keys[keys.length - 1];
            this.state[lastKey] = nexIState[lastKey] as TState[typeof lastKey];
        }
    }

    private _makeStateProxy(state: TState) {
        return new Proxy(state, {
            set: (target: TState, item: string, value: unknown) => {
                target[item as keyof TState] = value as TState[keyof TState];
                if (!this._isBatching) {
                    this._meta.state = this.state;
                    this.eventBus().emit(
                        Store.EVENTS.FLOW_SDU,
                        this._meta.state,
                        target,
                    );
                }
                return true;
            },
            deleteProperty: () => {
                throw new Error('Нет доступа');
            },
        });
    }
}

