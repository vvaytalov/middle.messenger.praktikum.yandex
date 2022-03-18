export const template = () => `
  <template class="{{ className }}">
    <img src={{icon}} />
    <form class="{{ classNameForm }}" novalidate autocomplete="off">
      <MessageInput />
      <SendButton />
    </form>
  </template>
`;
