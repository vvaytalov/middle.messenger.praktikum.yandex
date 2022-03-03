import { IProps } from '../../modules/Block';
import { join } from '../../utils/templator';

export const template = (props: IProps) => `
    <template class="{{className}}">
        ${join(
            props.field.map(
                (item: any, i: number) => `
                <div class="{{className}}__button-wrap">
                    <a key="${i}" href="${item.link}" class="${!item.color ? '{{className}}' : '{{className}}__red'}">
                        ${item.label}
                    </a>
                </div>
            `),
        )}
    </template>
`;
