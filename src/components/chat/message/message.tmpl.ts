import { IProps } from '../../../modules/Block';

export const template = (props: IProps) => `
  <template class="${
      props.authorId === props.ownerId
          ? '{{ className }}'
          : '{{ className }} {{ className }}_outgoing-message'
  }">
    <img
      class="{{ className }}__avatar"
      src="{{ avatar }}"
      alt="Аватар пользователя {{ authorName }}"
    />
    <p class="{{ className }}__text">
      {{ text }}
      <date class="{{ className }}__date" datetime="{{ date }}">{{ formattedDate }}</date>
    </p>
  </template>
`;
