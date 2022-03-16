import { IProps } from '../../modules/Block';
import { join, stylize } from '../../utils/templator';

export const template = (props: IProps) => `
<template class="{{ className }}">
  <MenuButton />
  <ul
    class="{{ classNameMenu }}"
    ${stylize(props.style)}
  >
    ${join(
        props.MenuItem.map(
            (_: unknown, index: number) => `
      <li class="{{ className }}__item">
        <MenuItem key="${index}" />
      </li>
    `
        )
    )}
  </ul>
</template>
`;
