export const template = () => `
  <template class="{{ className }}">
    <li class="{{ className }}__item">
    	<ChatCard of="chats" onClick="{{ onSelect }}"/>
    </li>
  </template>
`;
