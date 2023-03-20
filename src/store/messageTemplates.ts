import { arrayStore } from './arrayStore';

type MessageTemplate = {
	title: string;
	message: string;
};

export const messageTemplates = arrayStore<MessageTemplate[]>({
	key: 'messageTemplates',
	initialValue: []
});
