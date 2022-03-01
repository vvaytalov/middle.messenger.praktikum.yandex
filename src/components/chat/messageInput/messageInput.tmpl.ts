export const template = () => `
  <template class="{{ className }}">
    <img src={{icon}} />
    <form class="{{ classNameForm }}" novalidate>
      <MessageInput />
      <SendButton />
    </form>
  </template>
`;
