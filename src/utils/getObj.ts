export function getObjectVal(
    obj: any,
    path: string,
    defaultValue?: unknown
): unknown {
    const keys = path.split('.');

    let result = obj;
    for (const key of keys) {
        result = result[key];

        if (result === undefined) {
            return defaultValue;
        }
    }

    return result ?? defaultValue;
}
