<script lang="ts">
	import { reserved } from './constants';
	import { section, sections } from './stores';

    let watching = false;
    let prevPos: number;

    const getCurrentSectionName = () => {
        let section: string = reserved.top;

        if (window.scrollY === 0) {
            return reserved.top;
        }

        for (let [name, el] of $sections) {
            const boundingRect = el.getBoundingClientRect();

            const withinTopHalf = boundingRect.top <= window.screen.height / 2;
            const aboveScreen = boundingRect.top > 0;
            const isLastSection = el === Array.from($sections.values()).at(-1);

            if (withinTopHalf && (aboveScreen || isLastSection)) {
                section = name;
                break;
            }
        }

        return section;
    }

    const watchScroll = () => {
        if (watching) {
            return;
        }

        const step = () => {
            if (window.scrollY === prevPos) {
                watching = false;
                $section = getCurrentSectionName();
                return;
            }
            prevPos = window.scrollY;
            window.requestAnimationFrame(step);
        }

        window.requestAnimationFrame(step);
    }
</script>

<svelte:window on:scroll={watchScroll} />