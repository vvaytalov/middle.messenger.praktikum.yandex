export const template = (): string => `
<template class="{{ className }}">
    <h1 class='{{ className }}__title'>{{codeError}}</h1>
    <h2>{{messageError}}</h2>
    <div class='{{ className }}__to-chat'>
        <Link />
    </div>
</template>
`;
