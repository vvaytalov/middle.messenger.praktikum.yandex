const parser = new window.DOMParser();

function getTemplateFromHTML(html: string): HTMLTemplateElement | null {
    const document = parser.parseFromString(html, 'text/html');
    return document.querySelector('template');
}

export default getTemplateFromHTML;
