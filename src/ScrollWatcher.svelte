<script lang="ts">
	import { reserved } from './constants';
	import { section, sections } from './stores';

    let timer: number | NodeJS.Timeout;

    function getSectionBounds() {
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (window.scrollY === 0) {
                $section = reserved.top;
                return;
            }

            for (let [name, el] of $sections) {
                const boundingRect = el.getBoundingClientRect();

                const withinTopHalf = boundingRect.top <= window.screen.height / 2;
                const aboveScreen = boundingRect.top > 0;
                const isLastSection = el === Array.from($sections.values()).at(-1);

                if (withinTopHalf && (aboveScreen || isLastSection)) {
                    $section = name;
                    break;
                }
            }
        }, 100);
    }
</script>

<svelte:window on:scroll={getSectionBounds} />