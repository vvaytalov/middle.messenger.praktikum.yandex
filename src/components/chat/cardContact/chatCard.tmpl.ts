import { IProps } from '../../../modules/Block';

export const template = (props: IProps) => `
  <template class="{{ className }}">
    <img
      class="{{ className }}__avatar"
      alt="Аватар пользователя"
      src="{{ avatar }}"
    />
    <div class="{{ className }}__name-wrapper">
      <p class="{{ className }}__name">{{ title }}</p>
    </div>
    <p class="{{ className }}__last-message">{{ lastMessage }}</p>
    ${
        props.unread_count
            ? `<span class="{{ className }}__counter-unread-messages">
          {{ unread_count }}
        </span>`
            : ''
    }
    <date class="{{ className }}__updated-at" datetime="{{ updatedAt }}">{{ date }}</date>
  </template>
`;
