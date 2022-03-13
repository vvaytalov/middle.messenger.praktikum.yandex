import { template } from './NewChatForm.tmpl';
import Block from '../../modules/Block';
import { compile } from '../../utils/templator';
import { handleFormSubmit, validateForm } from '../../utils/handleForm';
import Button from '../button/button';
import Input from '../input/input';
import './NewChatForm.css';

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
                            pattern: '[\\w.]*',
                            maxlength: 60,
                            required: true,
                            'data-error':
                                'Обязательно поле. Только англ. буквы, символ _ и точка',
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

        this.props.Button = this.props.form.buttons.map(
            (button: any) => new Button(button)
        );
        this.props.Input = this.props.form.fields.map(
            (field: any) => new Input(field)
        );
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
