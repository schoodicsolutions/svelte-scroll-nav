import { writable } from 'svelte/store';
import { reserved } from './constants';


interface SectionWeight {
    name: string,
    weight: number,
}

export const section = writable(reserved.top);
export const sections = writable<Map<string, HTMLElement>>(new Map());
export const linkClicked = writable(false);

// For DEBUGGING / DEMO only
export const weights = writable<SectionWeight[]>([]);