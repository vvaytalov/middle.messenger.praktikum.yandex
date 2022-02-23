import { join } from "./templator";

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

export default function generateForm(props: IForm, formClassName: string) {
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
