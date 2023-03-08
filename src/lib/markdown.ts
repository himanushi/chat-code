import { remark } from 'remark';
import parse from 'remark-parse';
import gfm from 'remark-gfm';
import rehype from 'remark-rehype';
import stringify from 'rehype-stringify';
import highlight from 'rehype-highlight';

const marked = remark()
	.use(parse)
	.use(rehype)
	.use(stringify)
	.use(highlight, { detect: true, subset: ['javascript'], ignoreMissing: true })
	.use(gfm);

export const markdown = (
	text: string,
	callback: (err: Error | null | undefined, file: any | undefined) => void
) => marked.process(text, callback);
