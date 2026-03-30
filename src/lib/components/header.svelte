<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';

	const nav = [
		{ label: 'BRIDGE', href: '/', icon: '◈' },
		{ label: 'MISSION LOG', href: '/todos', icon: '▤' },
	];
</script>

<header class="hud-header">
	<!-- ── Top identity bar ── -->
	<div class="ident-bar">
		<div class="ship-id">
			<span class="ship-icon glow-pulse">◈</span>
			<div class="ship-name-block">
				<span class="ship-name">IMPERIAL STAR DESTROYER</span>
				<span class="ship-sub">ISD DEVASTATOR // CLASS: IMPERIAL II // BRIDGE COMMAND INTERFACE</span>
			</div>
		</div>

		<div class="sys-status">
			<div class="stat-item">
				<span class="dot green blink-soft"></span>
				<span>SHIELDS</span>
				<span class="stat-val">100%</span>
			</div>
			<div class="stat-sep">|</div>
			<div class="stat-item">
				<span class="dot amber"></span>
				<span>WEAPONS</span>
				<span class="stat-val amber-text">ARMED</span>
			</div>
			<div class="stat-sep">|</div>
			<div class="stat-item">
				<span class="dot green blink-soft"></span>
				<span>HYPERDRIVE</span>
				<span class="stat-val">STBY</span>
			</div>
		</div>
	</div>

	<!-- ── Divider ── -->
	<div class="divider">
		<div class="d-line"></div>
		<span class="d-gem">◆</span>
		<div class="d-line"></div>
	</div>

	<!-- ── Navigation ── -->
	<nav class="hud-nav">
		<span class="nav-prefix">SYS.ACCESS //</span>
		{#each nav as item}
			<a
				href={resolve(item.href)}
				class="nav-btn"
				class:active={$page.url.pathname === item.href}
			>
				<span class="nav-ico">{item.icon}</span>
				{item.label}
				<span class="btn-corner tl"></span>
				<span class="btn-corner br"></span>
			</a>
		{/each}
	</nav>
</header>

<style>
	.hud-header {
		background: rgba(0, 8, 3, 0.93);
		border-bottom: 1px solid var(--g-border);
		backdrop-filter: blur(6px);
		padding: 0.8rem 2rem 0;
		font-family: var(--ft);
	}

	/* ── Identity bar ── */
	.ident-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.55rem;
	}

	.ship-id {
		display: flex;
		align-items: center;
		gap: 0.9rem;
	}

	.ship-icon {
		font-size: 1.6rem;
		color: var(--g);
		line-height: 1;
	}

	.ship-name-block {
		display: flex;
		flex-direction: column;
		gap: 0.05rem;
	}

	.ship-name {
		font-family: var(--fh);
		font-size: 0.72rem;
		font-weight: 900;
		letter-spacing: 0.22em;
		color: var(--g);
		text-shadow: 0 0 12px rgba(0, 255, 65, 0.55);
	}

	.ship-sub {
		font-family: var(--ft);
		font-size: 0.75rem;
		color: var(--g-dim);
		letter-spacing: 0.1em;
	}

	/* ── System status ── */
	.sys-status {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		font-size: 0.88rem;
		color: var(--g-dim);
		letter-spacing: 0.09em;
	}

	.stat-item {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.stat-val {
		color: var(--g);
		font-weight: 600;
	}

	.amber-text {
		color: var(--amber);
	}

	.stat-sep {
		color: var(--g-border);
		font-size: 0.7rem;
	}

	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		display: inline-block;
		flex-shrink: 0;
	}

	.dot.green {
		background: var(--g);
		box-shadow: 0 0 6px var(--g);
	}

	.dot.amber {
		background: var(--amber);
		box-shadow: 0 0 6px var(--amber);
	}

	/* ── Divider ── */
	.divider {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 0.5rem;
	}

	.d-line {
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--g-border), transparent);
	}

	.d-gem {
		color: var(--g-border);
		font-size: 0.55rem;
	}

	/* ── Navigation ── */
	.hud-nav {
		display: flex;
		align-items: flex-end;
		gap: 0.35rem;
	}

	.nav-prefix {
		font-size: 0.85rem;
		color: rgba(0, 255, 65, 0.3);
		letter-spacing: 0.15em;
		margin-right: 0.3rem;
		padding-bottom: 0.4rem;
	}

	.nav-btn {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.4rem 1.4rem;
		font-family: var(--fh);
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		color: rgba(0, 255, 65, 0.5);
		text-decoration: none;
		border: 1px solid transparent;
		border-bottom: none;
		transition:
			color 0.2s,
			background 0.2s,
			border-color 0.2s,
			box-shadow 0.2s;
		background: transparent;
	}

	.nav-btn:hover {
		color: var(--g);
		background: rgba(0, 255, 65, 0.07);
		border-color: var(--g-border);
		text-shadow: 0 0 8px rgba(0, 255, 65, 0.5);
	}

	.nav-btn.active {
		color: var(--g);
		background: rgba(0, 255, 65, 0.11);
		border-color: rgba(0, 255, 65, 0.5);
		text-shadow: 0 0 10px rgba(0, 255, 65, 0.65);
		box-shadow:
			0 0 18px rgba(0, 255, 65, 0.12),
			inset 0 0 10px rgba(0, 255, 65, 0.04);
	}

	.nav-ico {
		font-size: 0.95rem;
		line-height: 1;
	}

	/* Corner bracket decorations on nav button */
	.btn-corner {
		position: absolute;
		width: 6px;
		height: 6px;
		border-color: var(--g);
		border-style: solid;
		opacity: 0;
		transition: opacity 0.2s;
	}

	.nav-btn:hover .btn-corner,
	.nav-btn.active .btn-corner {
		opacity: 1;
	}

	.btn-corner.tl {
		top: -1px;
		left: -1px;
		border-width: 2px 0 0 2px;
	}

	.btn-corner.br {
		bottom: -1px;
		right: -1px;
		border-width: 0 2px 2px 0;
	}
</style>
