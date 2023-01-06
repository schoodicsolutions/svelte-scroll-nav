<script>
	import { scrollTo, scrollRef, section } from '$lib';
	import ScrollWatcher from '$lib/ScrollWatcher.svelte';

    const skeletons = Array(10).fill('').map(
        (_, i) => {
            const num = i + 1;
            return {heading: `Section ${num}`, section: `section${num}`};
        }
    );
</script>

<style>
    :global(html), :global(body) {
        scroll-behavior: smooth;
        margin: 0;
        padding: 0;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .sections {
        padding-top: 64px;
    }

    section {
        border-top: #000 2px solid;
        height: 66vh;
        padding: 16px;
    }

    ul {
        margin: 0;
        padding: 0;
        display: flex;
        gap: 1rem;
        list-style: none;
        align-items: middle;
    }

    nav {
        width: 100%;
        height: 64px;
        position: fixed;
        padding: 16px;
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
        <section use:scrollRef={skeleton.section}>
            <h1>{skeleton.heading}</h1>
        </section>
    {/each}
</div>
