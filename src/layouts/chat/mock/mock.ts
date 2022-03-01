import avatarImage from "../../../assets/img/noavatar.svg";

export const contacts = [
    {
        id: "1",
        name: "Влад",
        lastMessage: "У меня особенный выпуск новостей!...",
        ownerLastMessage: "Влад",
        counterUnreadMessages: 1,
        avatar: avatarImage,
        updatedAt: "2022-01-01",
    },
    {
        id: "2",
        name: "Киноклуб",
        lastMessage: "У меня особенный выпуск новостей!...",
        ownerLastMessage: "Киноклуб",
        counterUnreadMessages: 0,
        avatar: avatarImage,
        updatedAt: "2022-01-01",
    },
    {
        id: "3",
        name: "Илья",
        lastMessage: "Привет!",
        ownerLastMessage: "Илья",
        counterUnreadMessages: 4,
        avatar: avatarImage,
        updatedAt: "2022-01-01",
    },
    {
        id: "4",
        name: "Вадим",
        lastMessage: "Круто",
        ownerLastMessage: "Вадим",
        counterUnreadMessages: 0,
        avatar: avatarImage,
        updatedAt: "2022-01-01",
    },
    {
        id: "5",
        name: "тет-а-теты",
        lastMessage:
            "И Human Interface Guidelines и Material Design рекомендуют...",
        ownerLastMessage: "тет-а-теты",
        counterUnreadMessages: 0,
        avatar: avatarImage,
        updatedAt: "2022-01-01",
    },
];

export const messages = [
    {
        id: "1",
        authorId: "1",
        authorName: "Влад",
        ownerId: "1",
        text: "Привет! Как дела?",
        avatar: null,
        date: "12:00",
    },
    {
        id: "2",
        authorId: "2",
        authorName: "Вася",
        ownerId: "1",
        text: "Привет! Отлично 😂",
        avatar: null,
        date: "12:00",
    },
];
