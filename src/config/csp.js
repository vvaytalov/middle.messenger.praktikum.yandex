const API_ORIGIN = 'https://ya-praktikum.tech';
const FONT_ORIGIN = 'https://fonts.gstatic.com';
const FONT_STYLE_ORIGIN = 'https://fonts.googleapis.com';

function createCspDirectives({ isDevelopment = false } = {}) {
    const directives = {
        'default-src': [
            "'self'",
        ],
        'connect-src': [
            "'self'",
            API_ORIGIN,
            `wss://${new URL(API_ORIGIN).host}`,
        ],
        'img-src': [
            "'self'",
            'data:',
            API_ORIGIN,
        ],
        'script-src': [
            "'self'",
        ],
        'style-src': [
            "'self'",
            FONT_STYLE_ORIGIN,
        ],
        'font-src': [
            "'self'",
            FONT_ORIGIN,
        ],
        'object-src': [
            "'none'",
        ],
        'base-uri': [
            "'self'",
        ],
    };

    if (isDevelopment) {
        directives['connect-src'].push('ws://localhost:*', 'http://localhost:*');
        directives['script-src'].push("'unsafe-eval'");
    }

    return directives;
}

function createCspMetaContent(options) {
    return Object.entries(createCspDirectives(options))
        .map(([name, values]) => `${name} ${values.join(' ')}`)
        .join('; ');
}

module.exports = {
    createCspDirectives,
    createCspMetaContent,
};
