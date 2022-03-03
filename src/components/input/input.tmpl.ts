import { IProps } from '../../modules/Block';
import { setAttributes } from '../../utils/templator';

export const template = (props: IProps): string => `
<template class="${
    props.classNameRoot
        ? '{{ className }} {{ classNameRoot }}'
        : '{{ className }}'
}">
<input
  class="{{ classNameInput }}"
  type="{{ type }}"
  ${props.name ? 'name="{{ name }}"' : ''}
  ${props.placeholder ? 'placeholder="{{ placeholder }}"' : ''}
  ${props.value ? 'value="{{ value }}"' : ''}
  ${setAttributes(props.validation)}
/>
${props.label ? '<span class="{{ classNameLabel }}">{{ label }}</span>' : ''}
<span class="{{ classNameError }}"></span>
</template>
`;
