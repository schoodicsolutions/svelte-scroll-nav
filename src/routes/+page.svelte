<script>
	import { scrollTo, scrollRef, section } from '$lib';
	import ScrollWatcher from '$lib/ScrollWatcher.svelte';

    const rand255 = () => Math.floor(Math.random() * 255);

    const skeletons = Array(50).fill('').map(
        (_, i) => {
            const num = i + 1;
            const bgColor = `rgb(${rand255()},${rand255()},${rand255()})`
            return {heading: `Section ${num}`, section: `section${num}`, bgColor};
        }
    );
</script>

<style>
    * {
        box-sizing: border-box;
    }

    :global(html), :global(body) {
        margin: 0;
        padding: 0;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .sections {
        flex-grow: 1;
        overflow: scroll;
        scroll-behavior: smooth;
    }

    section {
        border-top: #000 2px solid;
        height: 66vh;
        padding: 16px;
        scroll-margin-top: 64px;
    }

    ul {
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        list-style: none;
        align-items: middle;
        padding: 24px;
    }

    li {
        height:fit-content;
    }

    nav {
        width: 100%;
        background-color: lightgray;
        position: fixed;
    }

    a {
        color: inherit;
        font-weight: bold;
        text-decoration: none;
    }

    a.underlined {
        text-decoration: underline;
    }
</style>

<ScrollWatcher />

<nav>
    <ul>
        <li><a href="/" class:underlined={'+top' === $section} use:scrollTo={{section: '+top'}}>Top</a></li>
        {#each skeletons as skeleton}
            <li><a href="/" use:scrollTo={{section: skeleton.section}} class:underlined={skeleton.section === $section}>{skeleton.heading}</a></li>
        {/each}
    </ul>
</nav>

<div class="sections">
    {#each skeletons as skeleton}
        <section use:scrollRef={skeleton.section} style:background-color={skeleton.bgColor}>
            <h1>{skeleton.heading}</h1>
        </section>
    {/each}
</div>