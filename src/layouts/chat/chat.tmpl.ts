export const template = () => `
  <template class="{{ className }}">
    <aside class="{{ className }}__side-panel">
      <div class="{{ className }}__profile">
        <Link />
      </div>
      <div class="{{ className }}__side-panel-header">
        <SearchInput />
      </div>
      <ContactCardList />
      <div class="{{ className }}__side-panel-footer">
        <NewChatButton />
      </div>
    </aside>
    <div class="{{ className }}__main">
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </div>
    <NewChatPopup>
      <NewChatForm />
    </NewChatPopup>
  </template>
`;
