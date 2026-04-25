import { IProps } from '../../modules/Block';
import { setAttributes } from '../../modules/templator';

export const template = (props: IProps): string => `
<template class="${
    props.classNameRoot
        ? '{{ className }} {{ classNameRoot }}'
        : '{{ className }}'
}">
${props.multiline
    ? `<textarea
  class="{{ classNameInput }}"
  ${props.name ? 'name="{{ name }}"' : ''}
  ${props.placeholder ? 'placeholder="{{ placeholder }}"' : ''}
  rows="{{ rows }}"
  ${setAttributes(props.validation)}
>{{ value }}</textarea>`
    : `<input
  class="{{ classNameInput }}"
  type="{{ type }}"
  ${props.name ? 'name="{{ name }}"' : ''}
  ${props.placeholder ? 'placeholder="{{ placeholder }}"' : ''}
  ${props.value ? 'value="{{ value }}"' : ''}
  ${setAttributes(props.validation)}
/>`}
${props.label ? '<span class="{{ classNameLabel }}">{{ label }}</span>' : ''}
<span class="{{ classNameError }}"></span>
</template>
`;
