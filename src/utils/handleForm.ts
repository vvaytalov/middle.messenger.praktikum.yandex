import Button from '../components/button/button';
import Input from '../components/input/input';
import { IProps } from '../modules/Block';

import { join } from './templator';

export type IFormField = {
    type?: string;
    label?: string;
    name?: string;
};

export type IButtonField = {
    type?: string;
    label?: string;
};

interface IForm {
    fields: IFormField[];
    buttons: IButtonField[];
}

export type IFormButton = {
    type: 'submit';
    label: 'Сохранить новый пароль';
    color: 'primary';
    onClick: () => void;
};

export function generateForm(props: IForm, formClassName: string) {
    return `
        <form class='${formClassName}' novalidate>
            <div class='${formClassName}__input-field'>
                ${join(
                    props.fields.map(
                        (_: unknown, i: number) => `<Input key="${i}" />`
                    )
                )}
            </div>
            <div class='${formClassName}__input-button'>
                ${props.buttons.map(
                    (_: unknown, i: number) => `<Button key="${i}" />`
                )}
            </div>
        </form>
    `;
}

export function validateForm(
    form: HTMLFormElement | null,
    cb?: (isValid: boolean) => void
) {
    if (!form) {
        throw new Error('Форма для валидации не найдена');
    }

    const isValid = form.checkValidity();

    if (!cb) {
        const submitButton: HTMLButtonElement | null =
            form.querySelector('[type=submit]');
        if (isValid && submitButton) {
            submitButton.disabled = false;
        } else if (submitButton) {
            submitButton.disabled = true;
        }
    } else {
        cb(isValid);
    }
}

export function handleFormSubmit(evt: Event): Record<string, string> {
    if (!(evt?.target as HTMLFormElement)?.elements) {
        throw new Error('Необходимо передать событие submit с формы');
    }
    evt.preventDefault();
    const { elements } = evt.target as HTMLFormElement;
    const fields = Array.from(elements).filter((el) => el.nodeName === 'INPUT');
    const formData = fields.reduce(
        (acc: Record<string, string>, field: HTMLInputElement) => {
            acc[field.name] = field.value;
            return acc;
        },
        {}
    );
    return formData;
}

export function registerFormElements(props: IProps) {
    if (!props.form.fields || !props.form.buttons) {
        throw new Error(
            'Необходимо создать в props.form массивы fields[] и buttons[], описывающие элементов формы'
        );
    }
    props.Input = props.form.fields.map(
        (field: IFormField) => new Input(field)
    );
    props.Button = props.form.buttons.map(
        (button: IFormButton) => new Button(button)
    );
}
