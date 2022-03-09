export function queryStringify(data: Object) {
    if (typeof data !== 'object') {
        throw new Error('Not object');
    }

    return Object.entries(data).reduce(
        (acc, [key, val], i) => `${acc}${i === 0 ? '?' : '&'}${key}=${val}`,
        ''
    );
}
