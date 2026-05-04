export default function createId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return `id-${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .slice(2)}`;
}
