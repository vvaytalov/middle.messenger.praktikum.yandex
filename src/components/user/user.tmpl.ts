export const template = () => `
  <template class="{{ className }}">
    <img
      class="{{ className }}__avatar"
      src="{{ avatar }}"
      alt="Аватар пользователя {{ login }}"
    />
    <p class="{{ className }}__login">{{ login }}</p>
  </template>
`;
