import DOMPurify from 'dompurify';
import { marked } from 'marked';

const renderer = new marked.Renderer();
renderer.link = (href, title, text) => {
	if (href && (href.indexOf('http://') === 0 || href.indexOf('https://') === 0)) {
		return `<a target="_blank" href="${href}" title="${title}">${text}</a>`;
	}
	return `<a href="${href}" title="${title}">${text}</a>`;
};

const config: DOMPurify.Config = { ADD_ATTR: ['target'] };

export const markdown = (text: string) => DOMPurify.sanitize(marked(text, { renderer }), config);
