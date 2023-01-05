<script lang="ts">
	import { get } from 'svelte/store';
	import { reserved } from './constants';
	import { section, sections, linkClicked } from './stores';

    interface SectionWeight {
        name: string,
        weight: number,
    }

    let watching = false;
    let prevPositions: number[] = [];

    let scrollY: number;

    const bufferLimit = 8;

    const getCurrentSectionName = () => {
        let currentSection: string = get(section);

        if (window.scrollY === 0) {
            return reserved.top;
        }
        
        const weights: SectionWeight[] = Array.from($sections).map(
            ([name, el]) => {
                const rect = el.getBoundingClientRect();

                const fullyInView = rect.top > 0 && rect.bottom < window.innerHeight;
                const takesUpScreen = rect.top <= 0 && rect.bottom >= window.innerHeight;
                const peekingFromTop = rect.bottom > 0 && rect.bottom < window.innerHeight;
                const peekingFromBottom = rect.top > 0 && rect.bottom >= window.innerHeight;

                if (fullyInView || takesUpScreen) {
                    return {
                        name, 
                        weight: 1
                    };
                } else if (peekingFromTop) {
                    return {
                        name,
                        weight: rect.bottom / window.innerHeight,
                    };
                } else if (peekingFromBottom) {
                    return {
                        name,
                        weight: (window.innerHeight - rect.top) / window.innerHeight,
                    };
                } else {
                    return {
                        name,
                        weight: 0
                    }
                }
            }
        )

        const winner = weights.sort(
            (weightA, weightB) => weightA.weight - weightB.weight
        ).pop();

        return winner?.name || currentSection;
    }


    const watchScroll = () => {
        if (watching) return;

        console.log('start watching', Math.random());
        watching = true;

        const step = () => {
            if (prevPositions.length === bufferLimit) { 
                prevPositions.shift();
            };

            prevPositions.push(scrollY);

            if (prevPositions.filter(v => v === scrollY).length === bufferLimit) {
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