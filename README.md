# Чат

Я.Месседжер - разработка чата в первом спринте. Используется JavaScript, CSS.
Используется свой шаблонизатор.

`Сборщик` - parcel

`Предпроцессор` - PostCSS

# Основные комманды

`npm run start` - старт приложения с nodejs на 300 порту

`npm run dev` - старт приложения на 3000 порту

`npm run build` - сборка приложения в папку dist

`npm instal` - установка зависимостей

`npm lint` - проверка синтаксиса

`npm fix` - исправление ошибок синтаксиса

`npm run test` - запуск тестов

-   Реализация клиентского роутера (`classes/Route.ts`, `classes/Router.ts`)
-   Добавлен `api`
-   Добавлен `controllers`
-   Реализация хранилища `Store.ts`
-   Использован `WebSocket` для сообщений чата
-   Реализован виртуальный список для сообщений чата (подгрузка сообщений по частям)
-   Частично покрыто тестами (`Mocha`, `Chai`)
-   В приложении реализованы следующее возможности:
    -   Регистрация
    -   Авторизация
    -   Выход
    -   Обновление данных профиля
    -   Изменение аватара
    -   Создание и удаление чата
    -   Поиск, добавление и удаление пользователей в чате
    -   Отправка и получение текстовых сообщений
-   Добавлены правила `Content-Security-Policy`

# Автодеплой

В проекте настроен автодеплой на Netlify.

[Netlify](https://ya-messenger-vvaytalov.netlify.app/auth_signup.html)

# Макет

[figma](<https://www.figma.com/file/DAz7bJDUY3YJiLA1A4Y7O1/Chat-(Copy)?node-id=0%3A1>)

## Pull requests

https://github.com/vvaytalov/middle.messenger.praktikum.yandex/pull/2
