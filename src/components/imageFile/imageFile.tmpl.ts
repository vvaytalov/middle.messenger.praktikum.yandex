export const template = () => `
  <template>
    <div class="{{ classNameRoot }}">
      <input class="{{ className }}__input" type="file" id="avatar" name="avatar" accept="image/*">
      <img class="{{ className }}__image" src="{{ src }}" alt="{{ alt }}" />
    </div>
    <h2>{{ title }}</h2>
  </template>
`;
