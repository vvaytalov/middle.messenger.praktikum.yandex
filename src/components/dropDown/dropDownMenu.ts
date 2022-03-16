import Button from '../Button/Button';
import { template } from './dropDownMenu.tmpl';
import Block from '../../modules/Block';
import { compile } from '../../utils/templator';
import './dropDownMenu.css';

interface IDropDownMenu {
    classMix?: string;
    items: any[];
    icon: string;
    title: string;
    style: Record<string, string>;
}

export default class DropDownMenu extends Block {
    constructor(props: IDropDownMenu) {
        super('div', {
            className: 'drop-down-menu',
            classMix: props.classMix,
            classNameRoot: props.classMix,
            classNameMenu: 'drop-down-menu__menu',
            classNameMenuOpen:
                'drop-down-menu__menu drop-down-menu__menu_opened',
            style: props.style ?? null,
            MenuButton: new Button({
                title: 'Управление пользователями',
                icon: props.icon,
                light: true,
                onClick: () => this.toggleMenu(true),
            }),
            MenuItem: props.items.map(
                (item) =>
                    new Button({
                        ...item,
                        light: true,
                        onClick: () => {
                            item.onClick();
                            this.toggleMenu(false);
                        },
                    })
            ),
        });
        this.handleOverlay = this.handleOverlay.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    handleOverlay(evt: MouseEvent) {
        if (!(evt.target as HTMLElement).closest('.drop-down-menu__menu')) {
            this.toggleMenu(false);
            document.removeEventListener('mousedown', this.handleOverlay);
        }
    }

    toggleMenu(isOpen: boolean) {
        const menuElement = this.getContent().lastElementChild;
        if (!menuElement) {
            return;
        }
        if (isOpen) {
            menuElement.className = this.props.classNameMenuOpen;
            document.addEventListener('mousedown', this.handleOverlay);
        } else {
            menuElement.className = this.props.classNameMenu;
            document.removeEventListener('mousedown', this.handleOverlay);
        }
    }

    render() {
        return compile(template, this.props);
    }
}
