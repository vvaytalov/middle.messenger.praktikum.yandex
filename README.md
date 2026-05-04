# Чат

Одностраничное приложение мессенджера для курса Яндекс Практикума.

Проект написан на TypeScript и CSS. Внутри используются собственные реализации `Block`, `Router`, `Store`, шаблонизатор, API-контроллеры и WebSocket-контроллер сообщений. Сборка выполняется через Webpack.

## Основные команды

`npm install` - установка зависимостей.

`npm run dev` - запуск dev-сервера Webpack на порту 3000.

`npm run build` - сборка приложения в папку `dist`.

`npm run start` - production-сборка и запуск Express-сервера на порту 3000.

`npm run lint` - проверка TypeScript/JavaScript и CSS.

`npm run fix` - автоисправление доступных ошибок ESLint и Stylelint.

`npm run test` - запуск unit-тестов.

## Возможности

- Регистрация, авторизация и выход из аккаунта.
- Просмотр и обновление данных профиля.
- Изменение аватара.
- Создание и удаление чатов.
- Поиск, добавление и удаление пользователей в чате.
- Отправка и получение текстовых сообщений через WebSocket.
- Виртуальный список сообщений с догрузкой истории.
- Content Security Policy для приложения и Express-сервера.

## Технологии

- TypeScript
- Webpack
- PostCSS
- Mocha и Chai
- Express

## Автодеплой

В проекте настроен автодеплой на Netlify.

[Netlify](https://ya-messenger-vvaytalov.netlify.app/auth_signup.html)

## Макет

[Figma](<https://www.figma.com/file/DAz7bJDUY3YJiLA1A4Y7O1/Chat-(Copy)?node-id=0%3A1>)

## Pull Requests

https://github.com/vvaytalov/middle.messenger.praktikum.yandex/pull/4
