export default function formatDate(val: string): string {
    const isDateGuard = (date: any): date is Date =>
        Object.prototype.toString.call(date) === '[object Date]';

    const isValidDate = (date: any): date is Date =>
        isDateGuard(date) && !Number.isNaN(date.getTime());

    const date = new Date(val);
    const now = new Date();
    const months = [
        'янв',
        'фев',
        'мар',
        'апр',
        'мая',
        'июн',
        'июл',
        'авг',
        'сен',
        'окт',
        'ноя',
        'дек',
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const diff = now.getDate() - date.getDate();

    let dateString = `${day} ${month}`;

    if (!isValidDate(date)) {
        return '';
    }

    if (diff < 1) {
        return (dateString = `${hour < 9 ? '0' + hour : hour}:${
            minutes < 9 ? '0' + minutes : minutes
        }`);
    }

    if (diff === 1) return (dateString = 'Вчера');

    return dateString;
}
