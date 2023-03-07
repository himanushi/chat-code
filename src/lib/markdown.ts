import DOMPurify from 'dompurify';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const renderer = new marked.Renderer();
renderer.link = (href, title, text) => {
	if (href && (href.indexOf('http://') === 0 || href.indexOf('https://') === 0)) {
		return `<a target="_blank" href="${href}" title="${title}">${text}</a>`;
	}
	return `<a href="${href}" title="${title}">${text}</a>`;
};

// renderer.code = (code: string, lang?: string, escaped?: boolean) => {
// 	const languageClassName = lang ? `language-${lang}` : '';
// 	const codeClassName = `code-block ${languageClassName}`;
// 	const highlightedCode = escaped ? code : hljs.highlightAuto(code);
// 	return `<pre class="${codeClassName}"><code class="${codeClassName}">${highlightedCode}</code></pre>`;
// };

// renderer.codespan = (text: string) => {
// 	return `<code style="background-color: #eee; padding: 2px;">${text}</code>`;
// };

const config: DOMPurify.Config = { ADD_ATTR: ['target'] };

export const markdown = (text: string) => DOMPurify.sanitize(marked(text, { renderer }), config);
