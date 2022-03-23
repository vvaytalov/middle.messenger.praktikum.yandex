export const template = () => `
  <template class="{{ className }}">
    <img
      class="{{ className }}__avatar"
      src="{{ avatar }}"
      alt="Аватар пользователя {{ avatar }}"
    />
    <p class="{{ className }}__name">{{ name }}</p>
    <ContactMenu />
  </template>
`;
