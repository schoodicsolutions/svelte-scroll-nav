<script lang="ts">
	import { get } from 'svelte/store';
	import { getWeight } from './getWeight';
	import { reserved, SCROLL_BUFFER } from './constants';
	import { section, sections, linkClicked } from './stores';

    let watching = false;
    let prevPositions: number[] = [];

    let scrollY: number;

    const getCurrentSectionName = () => {
        let currentSection: string = get(section);

        if (window.scrollY === 0) {
            return reserved.top;
        }
        
        const weights: Array<{name: string, weight: number}> = [];
        
        for (const [name, el] of $sections) {
            const weight = getWeight(el.getBoundingClientRect(), window);
            if (weight) {
                weights.push({name, weight});
            }
        }

        const heaviestSection = weights.sort(
            ({weight: weightA}, {weight: weightB}) => weightB - weightA
        ).pop();

        return heaviestSection?.name || currentSection;
    }

    const watchScroll = () => {
        if (watching) return;

        watching = true;

        const step = () => {
            if (prevPositions.length === SCROLL_BUFFER) { 
                prevPositions.shift();
            };

            prevPositions.push(scrollY);

            if (prevPositions.filter(v => v === scrollY).length === SCROLL_BUFFER) {
                prevPositions = [];
                if ($linkClicked) {
                    setTimeout(
                        () => {
                            $linkClicked = false;
                            watching = false;
                        },
                        1000
                    )
                    return;
                }
                $section = getCurrentSectionName();
                $linkClicked = false;
                watching = false;
                return;
            }

            window.requestAnimationFrame(step);
        }

        window.requestAnimationFrame(step);
    }
</script>

<svelte:window on:scroll={watchScroll} bind:scrollY />