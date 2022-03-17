import { IProps } from '../../modules/Block';

export const template = (props: IProps) => `
  <template
    class="{{ classMix }}"
    type="{{ type }}"
    ${props.title ? 'title="{{ title }}"' : ''}
    ${props.menuIndex ? 'data-menu-index="{{ menuIndex }}"' : ''}
    ${props.menuName ? 'data-menu-name="{{ menuName }}"' : ''}
    ${props.disabled ? 'disabled' : ''}
  >
    ${
        props.icon
            ? '<img class="{{ className }}__icon" src="{{ icon }}" alt="" />'
            : ''
    }
    {{ label }}
  </template>
`;
