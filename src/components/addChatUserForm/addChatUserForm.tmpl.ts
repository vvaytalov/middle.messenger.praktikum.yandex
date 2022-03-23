import { IProps } from '../../modules/Block';
import { generateForm } from '../../utils/handleForm';

export const template = (props: IProps) => `
  <template class="{{ className }}">
    ${generateForm(props.form, '{{ classNameForm }}')}
  </template>
`;
