<script lang="ts">
	import { section, weights } from "../stores";
	import { scrollRef, scrollTo } from "../";
	import ScrollWatcher from "../ScrollWatcher.svelte";

    let scrollY: number;
</script>

<style>
    :global(html) {
        scroll-behavior: smooth;
        margin: 0;
    }
</style>

<svelte:window bind:scrollY />

<ScrollWatcher />

<div style="position: fixed; height: 50px; top: 0; background: white; box-shadow: #000 0 0 2px 2px; width: 100%;">
    { $section }
    <div style="width: 100%; height: 30px; display: flex;">
        {#each $weights as weight}
            <div style={`background-color: rgba(${255 * (1 -weight.weight)},${255 * (1 -weight.weight)},${255 * (1 -weight.weight)}); height:100%; flex-grow: 1;`}>
            </div>
        {/each}
    </div>
</div>

<div style="margin-top: 50px;">
    <section>Top</section>
    {#each Array(200).fill(null).map((_, i) => i + 1) as index}
        <section style="height: 75vh; border-top: 2px black solid;" use:scrollRef={`section${index}`}>
            <h1>Section {index}</h1>
        </section>
    {/each}
</div>

<a href="/" use:scrollTo={{section: '+top'}}>top</a>