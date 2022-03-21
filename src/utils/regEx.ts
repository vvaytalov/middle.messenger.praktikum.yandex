// REG_EXP

export const REGEX_LOGIN: string = '^[a-z0-9_-]{3,16}$';
export const REGEX_PASSWORD: string =
    '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,40}$';
export const REGEX_EMAIL: string = '[a-z0-9]+@[a-z]+.[a-z]{2,3}';
export const REGEX_NAME: string = '[-A-Za-zА-Яа-я.\\s]*';
export const REGEX_TEL: string = '(\\+?[0-9])\\s?\\(?[0-9]{3}\\)?\\s?[0-9]{7}$';
export const REGEX_TEXT: string = '[-A-Z0-9a-zА-Яа-я.\\s]*';

//REG_MESSAGE
export const PASSWORD_MSG: string = 'Добавьте символы: !@#$%^&*';
export const TEL_MSG: string = 'Поле в формате: +79996431241';
export const NAME_MSG: string = 'Буквы, дефис или точка';
export const LOGIN_MSG: string = 'Англ. буквы, от 3 до 16 символов';
export const MAIL_MSG: string = 'Поле в формате email';
export const VALUE: string = 'Обязательно поле';
