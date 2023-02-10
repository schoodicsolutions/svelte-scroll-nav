<script lang="ts">
	import { get } from 'svelte/store';
	import { getWeight } from './getWeight';
	import { reserved, SCROLL_BUFFER } from './constants';
	import { section, sections, linkClicked } from './stores';

    let watching = false;
    let prevPositions: number[] = [];

    const getCurrentSectionName = () => {
        let currentSection: string = get(section);

        if (window.scrollY === 0) {
            return reserved.top;
        }
        
        const weights: Array<{name: string, weight: number}> = [];
        
        for (const [name, el] of $sections) {
            const weight = getWeight(el.getBoundingClientRect(), window);
            if (!weight) {
                continue;
            }
            weights.push({name, weight});
        }

        const heaviestSection = weights.sort(
            ({weight: weightA}, {weight: weightB}) => weightA - weightB
        ).pop();

        return heaviestSection?.name || currentSection;
    }

    const watchScroll = () => {
        if (watching) {
            return;
        }

        watching = true;

        const step = () => {
            if (prevPositions.length === SCROLL_BUFFER) { 
                prevPositions.shift();
            };

            prevPositions.push(window.scrollY);

            if (prevPositions.filter(v => v === window.scrollY).length === SCROLL_BUFFER) {
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

<svelte:window on:scroll|passive={watchScroll} />