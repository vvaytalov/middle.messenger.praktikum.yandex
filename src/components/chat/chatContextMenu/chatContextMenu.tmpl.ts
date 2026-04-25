import { IProps } from '../../../modules/Block';
import { stylize } from '../../../modules/templator';

export const template = (props: IProps) => `
  <template
    class="{{ classNameRoot }}"
    ${stylize(props.style)}
  >
    <MenuDeleteButton />
  </template>
`;
