export const template = () => `
  <template class="{{classNameRoot}}">
    <img
      class="{{ className }}__avatar"
      src="{{ avatar }}"
      alt="Аватар пользователя {{ authorName }}"
    />
    <div class="{{ className }}__body">
      <div class="{{ replyClass }}">
        {{ replyPreview }}
      </div>
      <p class="{{ messageBodyClass }}">
        {{ content }}
      </p>
      <div class="{{ className }}__meta">
        <div class="{{ className }}__actions">
          <button class="{{ replyActionClass }}" type="button" data-message-action="reply">Reply</button>
          <button class="{{ editActionClass }}" type="button" data-message-action="edit">Edit</button>
          <button class="{{ forwardActionClass }}" type="button" data-message-action="forward">Forward</button>
          <button class="{{ deleteActionClass }}" type="button" data-message-action="delete">Delete</button>
        </div>
        <span class="{{ metaStatusClass }}">{{ messageMetaStatus }}</span>
        <date class="{{ classNameDate }}" datetime="{{ time }}">{{ time }}</date>
      </div>
    </div>
  </template>
`;
