import Block from "../../modules/Block";
import { compile } from "../../utils/templator";
import { template } from "./input.tmpl";
import "./input.css";

interface IInput {
    className?: string;
    classMix?: string;
    label?: string;
    placeholder?: string;
    name?: string;
    type?: string;
    validation?: Record<string, string | number | boolean>;
    onInput?: (value: string) => void;
    onValidate?: (name: string, isValid: boolean) => void;
    useValidation?: () => void;
    color?: string;
    value?: string;
}

export default class Input extends Block {
    constructor(props: IInput) {
        super("label", {
            className: "input",
            classNameRoot: props.classMix,
            classNameInput: "input__field",
            classNameLabel: "input__label",
            classNameError: "input__error",
            name: props.name ?? "",
            label: props.label ?? "",
            value: props.value ?? "",
            placeholder: props.placeholder ?? props.label ?? "",
            type: props.type ?? "text",
            validation: props.validation ?? null,
            onInput: props.onInput ?? null,
            onValidate: props.onValidate ?? null,
            useValidation: props.useValidation ?? null,
            events: {
                input: (evt: InputEvent) => {
                    if (this.props.onInput) {
                        this.validate();
                        this.props.onInput(
                            (evt.target as HTMLInputElement).value
                        );
                    }
                },
                focusin: () => this.validate(),
                focusout: () => this.validate(),
            },
        });
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        if (this.props.useValidation) {
            this.props.useValidation(this.validate.bind(this));
        }
    }

    validate() {
        if (this.props.onValidate) {
            const inputElement: HTMLInputElement | null =
                this.getContent().querySelector(
                    `.${this.props.classNameInput}`
                );
            const labelElement: HTMLElement | null =
                this.getContent().querySelector(
                    `.${this.props.classNameLabel}`
                );
            const errorElement: HTMLElement | null =
                this.getContent().querySelector(
                    `.${this.props.classNameError}`
                );

            if (!inputElement || !errorElement) {
                return;
            }

            const validity = inputElement.checkValidity();
            this.props.onValidate(inputElement.name, validity);

            if (!validity) {
                const errorMessage = inputElement.validationMessage;
                const customErrorMessage = inputElement.dataset.error || "";
                errorElement.textContent = customErrorMessage || errorMessage;
                inputElement.className =
                    "input__field input__field_color_error";

                if (inputElement.value === "") {
                    errorElement.textContent = "Обязательное поле";
                } else if (
                    inputElement.value.length < 8 &&
                    inputElement.name === "password"
                ) {
                    errorElement.textContent = "От 8 до 20 символов";
                }

                if (labelElement) {
                    labelElement.className =
                        "input__label input__label_color_error";
                }
            } else {
                inputElement.className =
                    "input__field input__field_color_success";
                if (labelElement) {
                    labelElement.className =
                        "input__label input__label_color_success";
                }
            }
        }
    }

    render() {
        return compile(template, this.props);
    }
}
