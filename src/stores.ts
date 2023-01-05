import { writable } from 'svelte/store';
import { reserved } from './constants';

export const section = writable(reserved.top);
export const sections = writable<Map<string, HTMLElement>>(new Map());
export const linkClicked = writable(false);