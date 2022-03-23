export const template = () => `
  <template class="{{ classNameRoot }}">
    <img
      class="{{ className }}__avatar"
      src="{{ avatar }}"
      alt="Аватар пользователя {{ login }}"
    />
    <p class="{{ className }}__login">{{ login }}</p>
  </template>
`;
