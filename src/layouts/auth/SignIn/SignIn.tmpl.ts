import { IProps } from '../../../modules/Block';
import generateForm from '../../../utils/generateForm';

export const template = (props: IProps) => `
<template class="{{ className }}">
    <div class="{{ className }}__main">
        <div class="{{className}}__title">{{title}}</div>
        <div class='{{className}}__input-field'>
            ${generateForm(props.form, '{{className}}')}
        </div>
        <div class='{{className}}__to-sign-up'>
            <Link />
        </div>
    </div>
</template>
`;
