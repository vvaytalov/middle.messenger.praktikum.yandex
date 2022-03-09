import { IProps } from '../../../modules/Block';
import { join } from '../../../utils/templator';

export const template = (props: IProps) => `
  <template class="message-list chat-page__message-list">
    ${join(
        props.Message.map(
            (_: unknown, index: number) => `
      <li class="{{ className }}__item">
        <Message key="${index}" />
      </li>
    `,
        ),
    )}
  </template>
`;
