import { baseStore } from './baseStore';

export const apiKey = baseStore<string>({ key: 'apiKey', initialValue: '' });
