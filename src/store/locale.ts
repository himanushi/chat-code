import { baseStore } from './baseStore';

export const locale = baseStore<string | undefined>({ key: 'locale', initialValue: undefined });
