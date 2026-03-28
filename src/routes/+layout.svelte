<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/header.svelte';

	import { navigating } from '$app/stores';
	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="flex size-full flex-col">
	<Header />
	<main class="my-4 grow">
		{#if $navigating}
			<div class="loading-overlay">
				<p>Loading...</p>
			</div>
		{:else}
			{@render children()}
		{/if}
	</main>
</div>
