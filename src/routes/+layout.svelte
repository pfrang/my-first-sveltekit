<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/header.svelte';
	import { navigating } from '$app/stores';
	import Loader from '$lib/components/loader.svelte';

	let { children } = $props();

	// Stable star field — golden-angle distribution for even spread
	const stars = Array.from({ length: 220 }, (_, i) => ({
		id: i,
		x: (i * 137.508) % 100,
		y: (i * 73.137) % 100,
		size: i % 12 === 0 ? 3 : i % 5 === 0 ? 2 : 1,
		opacity: 0.15 + ((i * 31) % 70) / 100,
		twinkle: i % 3 === 0,
		dur: 2 + (i % 5),
		del: (i % 11) * 0.6,
	}));

	let timeStr = $state('');

	$effect(() => {
		const tick = () => {
			timeStr = new Date().toTimeString().slice(0, 8);
		};
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- ── Space background (fixed, behind everything) ── -->
<div class="space-bg" aria-hidden="true">
	<div class="nebula n1"></div>
	<div class="nebula n2"></div>
	<div class="nebula n3"></div>
	<div class="star-field">
		{#each stars as s (s.id)}
			<span
				class="star"
				class:tw={s.twinkle}
				style:left="{s.x}%"
				style:top="{s.y}%"
				style:width="{s.size}px"
				style:height="{s.size}px"
				style:opacity={s.opacity}
				style:--dur="{s.dur}s"
				style:--del="{s.del}s"
			></span>
		{/each}
	</div>
</div>

<!-- ── Terminal UI shell ── -->
<div class="ui-shell">
	<Header />

	<main class="ui-main">
		{#if $navigating}
			<Loader />
		{:else}
			{@render children()}
		{/if}
	</main>

	<!-- Status bar -->
	<footer class="status-bar">
		<span>ISD DEVASTATOR // IMPERIAL FLEET TACTICAL SYSTEM v4.2.1</span>
		<span class="blink-soft" style="color: var(--g)">● SECURE UPLINK ACTIVE</span>
		<span>LOCAL TIME: {timeStr} // SECTOR 7-G</span>
	</footer>
</div>

<style>
	/* ── Space background ── */
	.space-bg {
		position: fixed;
		inset: 0;
		background: #000810;
		z-index: 0;
		overflow: hidden;
	}

	.nebula {
		position: absolute;
		border-radius: 50%;
		filter: blur(90px);
		pointer-events: none;
	}

	.n1 {
		width: 75vw;
		height: 75vw;
		top: -28%;
		left: -18%;
		background: radial-gradient(ellipse, rgba(45, 0, 110, 0.52) 0%, transparent 70%);
	}

	.n2 {
		width: 65vw;
		height: 65vw;
		bottom: -22%;
		right: -18%;
		background: radial-gradient(ellipse, rgba(0, 35, 90, 0.48) 0%, transparent 70%);
	}

	.n3 {
		width: 50vw;
		height: 50vw;
		top: 30%;
		left: 38%;
		background: radial-gradient(ellipse, rgba(0, 80, 25, 0.13) 0%, transparent 70%);
	}

	.star-field {
		position: absolute;
		inset: 0;
	}

	.star {
		position: absolute;
		border-radius: 50%;
		background: #fff;
		transform: translate(-50%, -50%);
		display: block;
	}

	.star.tw {
		animation: twinkle var(--dur, 3s) var(--del, 0s) ease-in-out infinite;
	}

	@keyframes twinkle {
		0%,
		100% {
			opacity: 0.1;
			transform: translate(-50%, -50%) scale(0.7);
		}
		50% {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1.3);
		}
	}

	/* ── UI shell ── */
	.ui-shell {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
	}

	.ui-main {
		flex: 1;
		padding: 2rem;
		overflow-y: auto;
	}

	/* ── Status bar ── */
	.status-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.35rem 2rem;
		border-top: 1px solid var(--g-border);
		background: rgba(0, 8, 3, 0.94);
		font-family: var(--ft);
		font-size: 0.82rem;
		color: var(--g-dim);
		letter-spacing: 0.09em;
	}
</style>
