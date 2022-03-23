import { IProps } from '../../../modules/Block';
import { generateForm } from '../../../utils/handleForm';

export const template = (props: IProps): string =>
    `
    <template class="{{className}}">
        <div class="{{className}}__main">
            <div class="{{className}}__avatar">
                <AvatarChoose />
            </div>
            ${generateForm(props.form, '{{className}}')}
            <div class="{{className}}__group">
                <div class="{{className}}__password">
                    <LinkPassword />
                </div>
                <div class="{{className}}__logout">
                    <LinkLogout />
                </div>
            </div>
        </div>
        <LinkBack />
    </template>
`;
