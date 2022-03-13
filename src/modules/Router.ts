import Route from './Route';
import Block from './Block';

export default class Router {
    public routes: Route[];
    public history: History;
    private _currentRoute: Route | null;
    private _rootQuery: string;
    private _pathnames: string[];
    private _onRouteCallback: () => void;
    private _unprotectedPaths: `/${string}`[];
    static __instance: Router;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this._pathnames = [];
        this._unprotectedPaths = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        this._onRouteCallback = () => {};

        Router.__instance = this;
    }

    get currentRoute() {
        return this._currentRoute;
    }

    public use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, {
            rootQuery: this._rootQuery,
        });

        this.routes.push(route);
        this._pathnames.push(pathname);
        return this;
    }

    private _hasRoute(pathname: string) {
        if (!this._pathnames.includes(pathname)) {
            return '*';
        }
        return pathname;
    }

    public start() {
        window.onpopstate = () => {
            const pathname = this._hasRoute(window.location.pathname);
            this._onRoute(pathname);
        };

        const pathname = this._hasRoute(window.location.pathname);
        this._onRoute(pathname);
    }

    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;

        route.render();

        if (!this._unprotectedPaths.includes(pathname as `/${string}`)) {
            this._onRouteCallback();
        }
    }

    public onRoute(callback: () => void) {
        this._onRouteCallback = callback;
        return this;
    }

    public setUnprotectedPaths(paths: `/${string}`[]) {
        this._unprotectedPaths = paths;
        return this;
    }

    public go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    public back() {
        this.history.back();
    }

    public forward() {
        this.history.forward();
    }

    public getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }

    public getLocationPathname() {
        return window.location.pathname;
    }
}
