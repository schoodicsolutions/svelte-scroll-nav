import { get } from 'svelte/store';
import { page } from '$app/stores';

import { reserved } from './constants';
import { section, sections } from './stores';
import { goto } from '$app/navigation';

import ScrollWatcher from './ScrollWatcher.svelte';

export { ScrollWatcher };

export interface LinkOptions {
    onNavigate?: () => void;
    scrollTo: string;
}

export function scrollTo(node: HTMLAnchorElement, options: LinkOptions) {
    const {scrollTo, onNavigate} = options;

    const listener = async (e: MouseEvent) => {
        e.preventDefault();
        
        if (onNavigate) {
            onNavigate();
        }

        if (node.href) {
            await goto(node.href);
        } else {
            await goto(get(page).url.pathname);
        }

        if (scrollTo === reserved.top) {
            return;
        }

        const wantedSection = get(sections).get(scrollTo);;

        if (wantedSection) {
            wantedSection.scrollIntoView(true);
        } else {
            return;
        }

        section.set(scrollTo);

    };

    node.addEventListener('click', listener);

    return {
        destroy() {
            node.removeEventListener('click', listener);
        }
    }
}

export function scrollRef(node: HTMLElement, name: string) {
    if (name[0] === '+') {
        throw new Error(`${name} is a reserved name`);
    }
    
    const currentSections = get(sections);

    if (currentSections.has(name)) {
        console.error(`Duplicate section '${name}'`);
        return;
    }

    sections.update(prev => {
        prev.set(name, node);
        return prev;
    });

    return {
        destroy() {
            sections.update(prev => {
                prev.delete(name);
                return prev;
            });  
        }
    }
}