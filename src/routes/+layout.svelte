<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/header.svelte';

	import { navigating } from '$app/stores';
	import Loader from '$lib/components/loader.svelte';
	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="flex size-full flex-col">
	<Header />
	<main class="my-4 grow">
		{#if $navigating}
			<Loader />
		{:else}
			{@render children()}
		{/if}
	</main>
</div>

<style>
	.loading-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}
</style>
