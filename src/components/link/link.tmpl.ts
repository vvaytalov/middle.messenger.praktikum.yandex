import { IProps } from '../../modules/Block';

export const template = (props: IProps) => `
    <template 
        class="${!props.color ? '{{className}}' : '{{className}}__red'}"
        ${props.target ? 'target="{{ target }}"' : ''}
        ${props.to ? 'href="{{ to }}"' : ''}
        ${props.name ? 'name="{{ name }}"' : ''}
    >
        ${props.label ? props.label : ''}
    </template>
`;
