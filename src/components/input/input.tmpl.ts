export const template = (): string => `
<template class='{{className}}'>
    <label 
        class='{{className}}__label' 
        for='{{id}}'
    >
        {{label}}
    </label>
    <input 
        class='{{className}}__input' 
        value='{{value}}' 
        type='{{type}}' 
        name='{{name}}' 
        id='{{id}}'
    />
</template>
`;
