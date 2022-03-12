import { v4 as uuid } from 'uuid';
import EventBus from './eventBus';
import getElementsFromString from '../utils/getTemplate';

export type IProps = Record<string, any>;

export default class Block {
    private _uuid: string;
    private _meta: {
        tagName: string;
        props: IProps;
    };

    private _element: HTMLElement;
    private eventBus: () => EventBus;
    public props: IProps;

    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    constructor(tagName: string = 'div', props: IProps = {}) {
        const eventBus = new EventBus();

        this._meta = {
            tagName,
            props,
        };

        this._uuid = uuid();

        this.props = this._makePropsProxy({ ...props, _uuid: this._uuid });
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    private _init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    public componentDidMount() {}

    private _componentDidUpdate(oldProps: IProps, newProps: IProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    public componentDidUpdate(oldProps: IProps, newProps: IProps) {
        return oldProps !== newProps;
    }

    public setProps = (nextProps: IProps) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    private _addEvents() {
        const { events = {} } = this.props;

        Object.entries(events).forEach(
            ([eventName, event]: [string, (evt: Event) => {}]) => {
                this._element.addEventListener(eventName, event);
            }
        );
    }

    private _removeEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            this._element.removeEventListener(eventName, events[eventName]);
        });
    }

    private _renderChildComponents(elements: NodeListOf<Element>) {
        elements.forEach((markerElement) => {
            if (markerElement instanceof HTMLElement) {
                const parent = markerElement.parentNode;
                if (parent && markerElement.dataset.uuid) {
                    const blockElement =
                        window._componentStore[markerElement.dataset.uuid];
                    parent.replaceChild(blockElement, markerElement);
                }
            }
        });
    }

    private _render() {
        const blockHTML = this.render();
        this._removeEvents();
        if (blockHTML) {
            const template = getElementsFromString(blockHTML);
            // Перенос атрибутов с <template> на обёртку блока
            if (template) {
                template.getAttributeNames().forEach((name) => {
                    this._element.setAttribute(
                        name,
                        template.getAttribute(name) || ''
                    );
                });

                const blockElements = template.content.cloneNode(true);
                this._element.innerHTML = '';
                this._element.append(blockElements);
                const markerElements =
                    this._element.querySelectorAll('[data-uuid]');
                this._renderChildComponents(markerElements);
                this._element.removeAttribute('data-uuid');
            }
        }
        this._addEvents();
    }

    render(): void | string {}

    public getContent() {
        return this.element;
    }

    private _makePropsProxy(props: IProps) {
        return new Proxy(props, {
            set: (target: IProps, prop: string, value: unknown) => {
                target[prop] = value;
                this._meta.props = this.props;
                this.eventBus().emit(
                    Block.EVENTS.FLOW_CDU,
                    this._meta.props,
                    target
                );
                return true;
            },
            deleteProperty: () => {
                throw new Error('Нет доступа');
            },
        });
    }

    private _createDocumentElement(tagName: string) {
        const element = document.createElement(tagName);
        element.setAttribute('data-uuid', this._uuid);
        return element;
    }

    public destroy() {
        this._element.remove();
        this.onDestroy;
    }

    public onDestroy() {}

    public show() {
        this.getContent().style.display = 'block';
    }

    public hide() {
        this.getContent().style.display = 'none';
    }
}
