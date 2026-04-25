import { IProps } from '../../../modules/Block';
import { join } from '../../../modules/templator';

export const template = (props: IProps) => `
  <template class="{{ className }}">
    ${
        props.isLoading && !props.chats.length
            ? join(
                  Array.from({ length: 6 }, () => `
        <li class="{{ className }}__item chat-card-list__item_skeleton">
          <div class="chat-card chat-card_skeleton">
            <div class="chat-card__avatar chat-card__avatar_skeleton"></div>
            <div class="chat-card__name-wrapper chat-card__name-wrapper_skeleton">
              <div class="chat-card__line chat-card__line_title"></div>
            </div>
            <div class="chat-card__updated-at chat-card__updated-at_skeleton"></div>
            <div class="chat-card__last-message chat-card__last-message_skeleton">
              <div class="chat-card__line chat-card__line_message"></div>
            </div>
          </div>
        </li>
      `),
              )
            : !props.isLoading && props.hasQuery && !props.chats.length
            ? `
      <li class="{{ className }}__empty-state">
        Чаты не найдены
      </li>
    `
            : `
      <li class="{{ className }}__item">
    	  <ChatCard of="chats" onClick="{{ onSelect }}" onDelete="{{ onDelete }}"/>
      </li>
    `
    }
  </template>
`;
