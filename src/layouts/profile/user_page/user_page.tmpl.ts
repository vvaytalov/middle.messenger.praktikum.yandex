import { IProps } from '../../../modules/Block';
import generateForm from '../../../utils/generateForm';

export const template = (props: IProps): string =>
    `
    <template class="{{className}}">
        <div class="{{className}}__main">
            <div class="{{className}}__avatar">
                <img src={{ avatar }} alt="avatar"/>
                <h2>{{ title }}</h2>
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
        <a href="/" class="back">
            <div class="arrow"></div>
        </a>
    </template>
`;
