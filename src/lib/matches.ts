/* eslint-disable @typescript-eslint/no-explicit-any */
import type { State } from 'xstate';

// ref: https://xstate.js.org/docs/guides/states.html#state-meta-data
export const matches = (service: State<any, any, any, any, any>, states: string[]) =>
	[states].some(service.matches);
