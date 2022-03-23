export const template = () => `
  <template class="{{ classNameRoot }}">
    <ul class="{{ className }}__user-grid">
      <User of="users" onClick="{{ onSelect }}" selectedUsers="{{ selectedUsers }}" />
    </ul>
    <ButtonAdd />
  </template>
`;
