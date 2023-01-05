<script lang="ts">
	import { get } from 'svelte/store';
	import { reserved } from './constants';
	import { section, sections } from './stores';

    let watching = false;
    let prevPositions: number[] = [];

    const getCurrentSectionName = () => {
        let currentSection: string = get(section);

        if (window.scrollY === 0) {
            return reserved.top;
        }

        for (let [name, el] of $sections) {
            const boundingRect = el.getBoundingClientRect();
            
            const withinTopHalf = boundingRect.top <= window.screen.height / 2;
            const belowScreen = boundingRect.top >= 0;
            const isLastSection = el === Array.from($sections.values()).at(-1);

            if (withinTopHalf && (belowScreen || isLastSection)) {
                currentSection = name;
                break;
            }
        }

        return currentSection;
    }


    const watchScroll = () => {
        if (watching) {
            return;
        }

        watching = true;

        const step = () => {

            if (prevPositions.length === 10) { prevPositions.shift() };
            prevPositions.push(window.scrollY);

            if (prevPositions.filter(v => v === window.scrollY).length === 10) {
                $section = getCurrentSectionName();
                watching = false;
                return;
            }

            window.requestAnimationFrame(step);
        }

        window.requestAnimationFrame(step);
    }
</script>

<svelte:window on:scroll={watchScroll} />