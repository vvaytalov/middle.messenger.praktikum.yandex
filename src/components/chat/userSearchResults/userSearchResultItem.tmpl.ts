export const template = () => `
  <template class="{{ className }}">
    <div class="{{ className }}__info">
      <img
        class="{{ className }}__avatar"
        src="{{ avatar }}"
        alt="Аватар пользователя {{ login }}"
      />
      <div class="{{ className }}__text">
        <p class="{{ className }}__name">{{ name }}</p>
        <p class="{{ className }}__login">@{{ login }}</p>
      </div>
    </div>
    <AddButton />
  </template>
`;
