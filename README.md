# Svelte Scroll Nav

## Introduction

Svelte Scroll Nav is a Svelte component and utility library designed to simplify the implementation of scroll-driven navigation within Svelte applications. It provides two-way binding between navigation menus and scrollable sections, enhancing the user experience in single-page applications.

## Features

- Smooth scrolling to page sections from navigation links.
- Dynamic active section highlighting based on scroll position.
- Customizable behavior through simple API.

## Installation

```bash
npm install svelte-scroll-nav
```

## Usage

### ScrollWatcher Component

Import and use the `ScrollWatcher` component to monitor scroll events and manage active sections.

```svelte
<script>
	import { ScrollWatcher } from 'svelte-scroll-nav';
</script>

<ScrollWatcher />
```

### scrollTo Function

Use the `scrollTo` function to handle navigation link clicks, enabling smooth scrolling to targeted sections.

```svelte
<script>
	import { scrollTo } from 'svelte-scroll-nav';
</script>

<a href="#section" use:scrollTo={{ section: 'sectionId' }}>Go to Section</a>
```

### scrollRef Function

Utilize the `scrollRef` action to register sections of the page for scroll navigation.

```svelte
<script>
	import { scrollRef } from 'svelte-scroll-nav';
</script>

<div use:scrollRef={'sectionId'}>Section Content</div>
```

## section Store

To dynamically highlight active links using the `section` store, bind your navigation links to a Svelte reactive statement that updates their class based on the current value of the `section` store. Here's a simplified example:

```svelte
<script>
	import { section } from 'svelte-scroll-nav';
</script>

<nav>
	<a href="#home" class:active={$section === 'home'}>Home</a>
	<a href="#about" class:active={$section === 'about'}>About</a>
	<a href="#contact" class:active={$section === 'contact'}>Contact</a>
</nav>

<style>
	.active {
		color: red; /* Highlight color */
	}
</style>
```

## Contributing

Guidelines for contributing to the project, including coding standards, pull request, and issue reporting instructions.

## License

Copyright (c) 2023-present, Ryan Prescott.
API partially based on [svelte-scrolling](https://github.com/valmisson/svelte-scrolling), also licensed under the MIT License, Copyright (c) 2021-present, Valmisson Grizorte.
