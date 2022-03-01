import { IProps } from "../../../modules/Block";
import { join } from "../../../utils/templator";

export const template = (props: IProps) => `
  <template class="{{ className }}">
    ${join(
        props.ContactCard.map(
            (_: unknown, index: number) => `
      <li class="{{ className }}__item">
        <ContactCard key="${index}" />
      </li>
    `
        )
    )}
  </template>
`;
