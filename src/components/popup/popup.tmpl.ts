import { IProps } from '../../modules/Block';

export const template = (props: IProps) => `
  <template class="{{ classNameRoot }}">
    <div class="{{ classNameCard }}">
      <div class="{{ className }}__header">
        ${props.comeBackButton ? '<ComeBackButton />' : ''}
        ${
            props.title
                ? '<h2 class="{{ className }}__title">{{ title }}</h2>'
                : ''
        }
        ${props.closeButton ? '<CloseButton />' : ''}
      </div>
      <div class="{{ className }}__body">
        {{ children }}
      </div>
    </div>
  </template>
`;
