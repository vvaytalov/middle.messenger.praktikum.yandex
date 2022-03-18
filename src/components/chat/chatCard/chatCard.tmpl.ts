import { IProps } from '../../../modules/Block';

export const template = (props: IProps) => `
  <template class="{{ classNameRoot }}">
    <img
      class="{{ className }}__avatar"
      alt="Аватар пользователя"
      src="{{ avatar }}"
    />
    <div class="{{ className }}__name-wrapper">
      <p class="{{ className }}__name">{{ title }}</p>
    </div>
    <p class="{{ className }}__last-message">{{ last_message.content }}</p>
    ${
        props.unread_count
            ? `<span class="{{ className }}__counter-unread-messages">
          {{ unread_count }}
        </span>`
            : ''
    }
    <date class="{{ className }}__updated-at" datetime="{{ time }}">{{ formatted_time }}</date>
  </template>
`;
