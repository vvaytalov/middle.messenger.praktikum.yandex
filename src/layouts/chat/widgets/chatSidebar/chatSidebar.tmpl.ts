export const template = () => `
  <template class="{{ className }}">
    <div class="{{ className }}__profile">
      <Link />
    </div>
    <div class="{{ className }}__header">
      <SearchInput />
    </div>
    <SearchResults />
    <ChatCardList />
    <div class="{{ className }}__footer">
      <NewChatButton />
    </div>
  </template>
`;
