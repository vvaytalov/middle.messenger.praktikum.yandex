export const REGEX_LOGIN: string = '^[a-z0-9_-]{3,16}$';
export const REGEX_PASSWORD: string =
    '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,40}$';
export const REGEX_EMAIL: string = '[a-z0-9]+@[a-z]+.[a-z]{2,3}';
export const REGEX_NAME: string = '[-A-Za-zА-Яа-я.\\s]*';
export const REGEX_TEL: string = '(\\+?[0-9])\\s?\\(?[0-9]{3}\\)?\\s?[0-9]{7}$';
