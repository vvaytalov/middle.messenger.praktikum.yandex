import Block, { IProps } from './Block';

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

function render(query: string, block: Block) {
    const root = document.querySelector(query);
    if (root) {
        root.append(block.getContent());
        return root;
    }
    return false;
}

class Route {
    private _pathname: string;
    private _blockClass: typeof Block;
    private _block: Block | null;
    private _props: IProps;

    constructor(pathname: string, view: typeof Block, props: IProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    public navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    public leave() {
        if (this._block) {
            this._block.destroy();
        }
    }

    public match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    public render() {
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
            return;
        }

        render(this._props.rootQuery, this._block);
    }
}

export default Route;
