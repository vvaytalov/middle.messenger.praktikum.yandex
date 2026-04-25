import { IProps } from '../../modules/Block';
import { join } from '../../modules/templator';

export const template = (props: IProps) => `
  <template class="{{ className }}">
    ${join(
        props.toasts.map(
            (toast: { id: number; type: string; message: string }) => `
      <div class="toast toast_type_${toast.type}" data-id="${toast.id}">
        <span class="toast__message">${toast.message}</span>
      </div>
    `,
        ),
    )}
  </template>
`;
