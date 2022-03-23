import { expect } from 'chai';
import Block from './Block';

describe('Блок', () => {
    let componentDidMount = false;
    let componentRender = false;
    let componentRenderAfterProps = false;

    interface IComponent {
        className?: string;
    }

    class Component extends Block {
        constructor(props?: IComponent) {
            super('button', {
                className: props?.className ?? 'button',
            });
        }

        public componentDidMount(): void {
            componentDidMount = true;
        }

        render(): string | void {
            componentRender = true;

            if (this.props.className === 'update-button') {
                componentRenderAfterProps = true;
            }

            return `<template class="button">Click me!</template>`;
        }
    }

    const component = new Component();

    it('Установка значений по умолчанию', () => {
        const componentDefaultProps = new Component();
        expect(componentDefaultProps.props.className).to.eq('button');
    });

    it('Установка кастомных значений', () => {
        const componentCustomProps = new Component({
            className: 'custom-button',
        });
        expect(componentCustomProps.props.className).to.eq('custom-button');
    });

    it('componentDidMount', () => {
        expect(componentDidMount).to.eq(true);
    });

    it('componentRender', () => {
        expect(componentRender).to.eq(true);
    });

    it('Обновление пропсов', () => {
        component.setProps({
            className: 'update-button',
        });
        expect(component.props.className).to.eq('update-button');
    });

    it('Обновление пропсов', () => {
        component.setProps({
            className: 'update-button',
        });
        expect(component.props.className).to.eq('update-button');
    });

    it('Проверка обновления пропсов', () => {
        expect(componentRenderAfterProps).to.eq(true);
    });
});
