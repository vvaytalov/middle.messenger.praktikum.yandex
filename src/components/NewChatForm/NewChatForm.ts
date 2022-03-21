import { template } from './newChatForm.tmpl';
import Block from '../../modules/Block';
import { compile } from '../../utils/templator';
import {
    handleFormSubmit,
    registerFormElements,
    validateForm,
} from '../../utils/handleForm';
import './NewChatForm.css';
import { REGEX_TEXT, VALUE } from '../../utils/regEx';

interface INewChatForm {
    onSubmit: (formData: Record<string, string>) => void;
}

class NewChatForm extends Block {
    constructor(props: INewChatForm) {
        super('div', {
            className: 'new-chat-form',
            classNameForm: 'new-chat-form__form',
            onSubmit: props?.onSubmit,
            form: {
                fields: [
                    {
                        type: 'text',
                        name: 'title',
                        placeholder: 'Название',
                        validation: {
                            pattern: REGEX_TEXT,
                            maxlength: 60,
                            required: true,
                            'data-error': VALUE,
                        },
                        onInput: () => {},
                        onValidate: () => this.validate(),
                    },
                ],
                buttons: [
                    {
                        type: 'submit',
                        label: 'Создать',
                        color: 'primary',
                        onClick: () => {
                            this.validate();
                        },
                    },
                ],
            },
            events: {
                submit: (evt: Event) => this.handleSubmit(evt),
            },
        });

        registerFormElements(this.props);

        this.validate = this.validate.bind(this);
    }

    validate() {
        const formElement: HTMLFormElement | null =
            this.getContent().querySelector(`.${this.props.classNameForm}`);
        validateForm(formElement);
    }

    handleSubmit(evt: Event) {
        const formData = handleFormSubmit(evt);

        this.props.onSubmit(formData);
    }

    render() {
        return compile(template, this.props);
    }
}

export default NewChatForm;
