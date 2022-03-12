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
                <Link />
            </div>
        </div>
        <LinkBack />
    </template>
`;
