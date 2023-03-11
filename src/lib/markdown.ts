import { remark } from 'remark';
import parse from 'remark-parse';
import gfm from 'remark-gfm';
import rehype from 'remark-rehype';
import stringify from 'rehype-stringify';
import highlight from 'rehype-highlight';
import { visit } from 'unist-util-visit';

const removeHttpLinks = () => (tree: any) => {
	visit(tree, 'element', (node: any, _, parent: any) => {
		if (
			node.tagName === 'a' &&
			node.properties.href &&
			(node.properties.href.startsWith('http://') ||
				node.properties.href.startsWith('https://') ||
				node.properties.href.startsWith('mailto:') ||
				node.properties.href.startsWith('tel:'))
		) {
			parent.children.splice(parent.children.indexOf(node), 1, {
				type: 'element',
				tagName: 'span',
				properties: {
					onClick: `window.open('${node.properties.href}', '_blank'); return false;`,
					style: 'cursor: pointer;text-decoration: underline;'
				},
				children: node.children
			});
		}
	});
};

const marked = remark()
	.use(parse)
	.use(rehype)
	.use(stringify)
	.use(highlight, { detect: true, subset: ['javascript'], ignoreMissing: true })
	.use(gfm)
	.use(removeHttpLinks);

export const markdown = (
	text: string,
	callback: (err: Error | null | undefined, file: any | undefined) => void
) => marked.process(text, callback);
