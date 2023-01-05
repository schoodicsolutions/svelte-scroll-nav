<script lang="ts">
	import { linkClicked, section } from "../stores";
	import { scrollRef, scrollTo } from "../";
	import ScrollWatcher from "../ScrollWatcher.svelte";

    let scrollY: number;
</script>

<style>
    :global(html) {
        scroll-behavior: smooth;
    }
</style>

<svelte:window bind:scrollY />

<ScrollWatcher />

<div style="position: fixed; height: 50px; top: 0;">
    {$section} 
    <a href="/" use:scrollTo={{section: 'section4'}}>section4</a>
    {scrollY}
    {$linkClicked}
</div>

<div style="margin-top: 50px;">
    <section>Top</section>
    {#each Array(200).fill(null).map((_, i) => i + 1) as index}
        <section style="height: 33vh; border-top: 2px black solid;" use:scrollRef={`section${index}`}>
            <h1>Section {index}</h1>
        </section>
    {/each}
</div>

<a href="/" use:scrollTo={{section: '+top'}}>top</a>