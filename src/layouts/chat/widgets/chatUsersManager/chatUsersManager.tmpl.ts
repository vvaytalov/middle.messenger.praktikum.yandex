export const template = () => `
  <template class="{{ className }}">
    <AddChatUserPopup>
      <AddChatUserForm />
      <AddUserList />
    </AddChatUserPopup>
    <DeleteChatUserPopup>
      <DeleteUserList />
    </DeleteChatUserPopup>
  </template>
`;
