export const template = () => `
  <template class="{{ className }}" data-composer-active="{{ composerActive }}">
    <img src={{icon}} />
    <div class="message-input__composer">
      <div class="message-input__composer-copy">
        <span class="message-input__composer-title">{{ composerTitle }}</span>
        <span class="message-input__composer-preview">{{ composerPreview }}</span>
      </div>
      <CancelComposerButton />
    </div>
    <form class="{{ classNameForm }}" novalidate autocomplete="off">
      <MessageInput />
      <SendButton />
    </form>
  </template>
`;
