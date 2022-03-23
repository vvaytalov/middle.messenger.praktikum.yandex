export const template = () => `
  <template class="{{classNameRoot}}">
    <img
      class="{{ className }}__avatar"
      src="{{ avatar }}"
      alt="Аватар пользователя {{ authorName }}"
    />
    <p class="{{ className }}__text">
      {{ content }}
      <date class="{{ classNameDate }}" datetime="{{ time }}">{{ time }}</date>
    </p>
  </template>
`;
