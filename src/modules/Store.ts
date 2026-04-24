import EventBus from './eventBus';

export type IState = Record<string, any>;

export default class Store {
    public state: IState;
    private subscribers: Function[];
    private _meta: {
        state: IState;
    };

    private _isBatching: boolean;

    private eventBus: () => EventBus;

    static EVENTS = {
        INIT: 'init',
        FLOW_SDM: 'flow:store-did-mount',
        FLOW_SDU: 'flow:store-did-update',
        FLOW_USE: 'flow:use',
    };

    constructor(initialState: IState = {}) {
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

    private _storeDidUpdate(oldState: IState, newState: IState) {
        const response = this.storeDidUpdate(oldState, newState);
        if (response) {
            this.eventBus().emit(Store.EVENTS.FLOW_USE);
        }
    }

    public storeDidUpdate(oldState?: IState, newState?: IState) {
        return oldState !== newState;
    }

    private _use() {
        this.subscribers.forEach((subscriber) => {
            subscriber(this.state);
        });
    }

    public subscribe(subscriber: (state: IState) => void) {
        this.subscribers.push(subscriber);
        subscriber(this.state);
        // Return unsubscribe function
        return () => {
            this.subscribers = this.subscribers.filter((s) => s !== subscriber);
        };
    }

    public setState(nexIState: IState) {
        if (!nexIState) {
            return;
        }
        // Batch updates: set flag to skip proxy notifications during assign
        this._isBatching = true;
        const keys = Object.keys(nexIState);
        // Apply all properties except the last one silently
        for (let i = 0; i < keys.length - 1; i++) {
            this.state[keys[i]] = nexIState[keys[i]];
        }
        // Release batch before last property so Proxy triggers once
        this._isBatching = false;
        if (keys.length > 0) {
            const lastKey = keys[keys.length - 1];
            this.state[lastKey] = nexIState[lastKey];
        }
    }

    private _makeStateProxy(state: IState) {
        return new Proxy(state, {
            set: (target: IState, item: string, value: unknown) => {
                target[item] = value;
                if (!this._isBatching) {
                    this._meta.state = this.state;
                    this.eventBus().emit(
                        Store.EVENTS.FLOW_SDU,
                        this._meta.state,
                        target
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

