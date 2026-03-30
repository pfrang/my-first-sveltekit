<script lang="ts">
	import { resolve } from '$app/paths';

	const systems = [
		{ label: 'DEFLECTOR SHIELDS', value: '100%', bar: 100, color: 'green', status: 'NOMINAL' },
		{ label: 'TURBOLASER BANKS', value: 'ARMED', bar: 88, color: 'amber', status: 'COMBAT READY' },
		{ label: 'HYPERDRIVE', value: 'CLASS 2', bar: 60, color: 'green', status: 'STANDBY' },
		{ label: 'TRACTOR BEAM', value: 'ONLINE', bar: 72, color: 'green', status: 'OPERATIONAL' },
		{ label: 'LIFE SUPPORT', value: '100%', bar: 100, color: 'green', status: 'NOMINAL' },
		{ label: 'COMM ARRAY', value: 'SECURE', bar: 95, color: 'green', status: 'ENCRYPTED' },
	];
</script>

<div class="bridge">
	<!-- ── Main title block ── -->
	<div class="bridge-title-block">
		<div class="pre-title">IMPERIAL STAR DESTROYER // ISD-7742</div>
		<h1 class="bridge-title glow-pulse">BRIDGE COMMAND CONSOLE</h1>
		<div class="post-title">
			<span class="blink">▮</span>
			AUTHORIZED COMMAND PERSONNEL ONLY — CLEARANCE: GRAND ADMIRAL
		</div>
	</div>

	<!-- ── Horizontal separator ── -->
	<div class="h-sep">
		<div class="sep-line"></div>
		<span class="sep-label">// SHIP SYSTEMS STATUS //</span>
		<div class="sep-line"></div>
	</div>

	<!-- ── System status grid ── -->
	<div class="systems-grid">
		{#each systems as sys}
			<div class="sys-panel">
				<div class="sys-corner tl"></div>
				<div class="sys-corner br"></div>
				<div class="sys-header">
					<span class="sys-label">{sys.label}</span>
					<span class="sys-val" style:color={sys.color === 'amber' ? 'var(--amber)' : 'var(--g)'}>
						{sys.value}
					</span>
				</div>
				<div class="sys-bar-track">
					<div
						class="sys-bar-fill"
						style:width="{sys.bar}%"
						style:background={sys.color === 'amber' ? 'var(--amber)' : 'var(--g)'}
						style:box-shadow={sys.color === 'amber'
							? '0 0 8px var(--amber)'
							: '0 0 8px var(--g-glow)'}
					></div>
				</div>
				<div class="sys-status-row">
					<span
						class="sys-dot"
						style:background={sys.color === 'amber' ? 'var(--amber)' : 'var(--g)'}
					></span>
					{sys.status}
				</div>
			</div>
		{/each}
	</div>

	<!-- ── Mission access panel ── -->
	<div class="h-sep" style="margin-top: 0.5rem;">
		<div class="sep-line"></div>
		<span class="sep-label">// COMMAND OPERATIONS //</span>
		<div class="sep-line"></div>
	</div>

	<div class="cmd-panels">
		<div class="cmd-panel">
			<div class="cmd-corner tl"></div>
			<div class="cmd-corner br"></div>
			<div class="cmd-icon">▤</div>
			<div class="cmd-info">
				<div class="cmd-title">MISSION LOG</div>
				<div class="cmd-desc">Access imperial order database. Add, modify, and purge standing orders.</div>
			</div>
			<a href={resolve('/todos')} class="cmd-btn">
				ACCESS SYSTEM
				<span class="cmd-arrow">›</span>
			</a>
		</div>

		<div class="cmd-panel cmd-panel--dim">
			<div class="cmd-corner tl"></div>
			<div class="cmd-corner br"></div>
			<div class="cmd-icon" style="color: var(--g-dim)">◉</div>
			<div class="cmd-info">
				<div class="cmd-title" style="color: var(--g-dim)">TACTICAL DISPLAY</div>
				<div class="cmd-desc" style="color: rgba(0,255,65,0.25)">
					Fleet positioning and sector mapping. — RESTRICTED
				</div>
			</div>
			<span class="cmd-btn cmd-btn--locked">LOCKED</span>
		</div>
	</div>

	<!-- ── Boot log ── -->
	<div class="boot-log">
		<div class="boot-line"><span class="boot-ts">[00:00:01]</span> IMPERIAL TACTICAL OS v4.2.1 — BOOT SEQUENCE COMPLETE</div>
		<div class="boot-line"><span class="boot-ts">[00:00:02]</span> DEFLECTOR GRID ONLINE // ALL SECTORS NOMINAL</div>
		<div class="boot-line"><span class="boot-ts">[00:00:03]</span> SECURE UPLINK ESTABLISHED — CORUSCANT COMMAND ACKNOWLEDGED</div>
		<div class="boot-line"><span class="boot-ts">[00:00:04]</span> AWAITING ORDERS FROM COMMAND PERSONNEL...</div>
		<div class="boot-line blink-soft">
			<span class="boot-ts">[READY]</span>
			<span class="blink">▮</span>
		</div>
	</div>
</div>

<style>
	.bridge {
		max-width: 1100px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	/* ── Title block ── */
	.bridge-title-block {
		text-align: center;
		padding: 1.5rem 0 0.5rem;
	}

	.pre-title {
		font-family: var(--ft);
		font-size: 0.95rem;
		color: var(--g-dim);
		letter-spacing: 0.2em;
		margin-bottom: 0.5rem;
	}

	.bridge-title {
		font-family: var(--fh);
		font-size: clamp(1.4rem, 3vw, 2.2rem);
		font-weight: 900;
		letter-spacing: 0.2em;
		color: var(--g);
		text-shadow:
			0 0 20px rgba(0, 255, 65, 0.6),
			0 0 60px rgba(0, 255, 65, 0.2);
		margin: 0 0 0.6rem;
	}

	.post-title {
		font-family: var(--ft);
		font-size: 0.88rem;
		color: rgba(0, 255, 65, 0.35);
		letter-spacing: 0.18em;
	}

	/* ── Separator ── */
	.h-sep {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.sep-line {
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--g-border), transparent);
	}

	.sep-label {
		font-family: var(--ft);
		font-size: 0.82rem;
		color: rgba(0, 255, 65, 0.35);
		letter-spacing: 0.15em;
		white-space: nowrap;
	}

	/* ── Systems grid ── */
	.systems-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 1rem;
	}

	.sys-panel {
		position: relative;
		background: var(--panel);
		border: 1px solid var(--g-border);
		padding: 0.9rem 1.1rem;
		box-shadow: 0 0 16px var(--g-glow);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.sys-corner {
		position: absolute;
		width: 10px;
		height: 10px;
		border-color: var(--g);
		border-style: solid;
	}

	.sys-corner.tl {
		top: -1px;
		left: -1px;
		border-width: 2px 0 0 2px;
	}

	.sys-corner.br {
		bottom: -1px;
		right: -1px;
		border-width: 0 2px 2px 0;
	}

	.sys-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.sys-label {
		font-family: var(--fh);
		font-size: 0.55rem;
		letter-spacing: 0.14em;
		color: rgba(0, 255, 65, 0.6);
	}

	.sys-val {
		font-family: var(--ft);
		font-size: 1.1rem;
		font-weight: 700;
		letter-spacing: 0.1em;
	}

	.sys-bar-track {
		height: 4px;
		background: rgba(0, 255, 65, 0.1);
		border-radius: 2px;
		overflow: hidden;
	}

	.sys-bar-fill {
		height: 100%;
		border-radius: 2px;
		transition: width 0.6s ease;
	}

	.sys-status-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--ft);
		font-size: 0.85rem;
		color: var(--g-dim);
		letter-spacing: 0.08em;
	}

	.sys-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		display: inline-block;
	}

	/* ── Command panels ── */
	.cmd-panels {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	@media (max-width: 600px) {
		.cmd-panels {
			grid-template-columns: 1fr;
		}
	}

	.cmd-panel {
		position: relative;
		background: var(--panel);
		border: 1px solid var(--g-border);
		padding: 1.2rem 1.4rem;
		display: flex;
		align-items: center;
		gap: 1.2rem;
		box-shadow: 0 0 20px var(--g-glow);
		transition: box-shadow 0.3s;
	}

	.cmd-panel:hover {
		box-shadow: 0 0 35px rgba(0, 255, 65, 0.3);
	}

	.cmd-panel--dim {
		border-color: rgba(0, 255, 65, 0.15);
		box-shadow: none;
	}

	.cmd-panel--dim:hover {
		box-shadow: none;
	}

	.cmd-corner {
		position: absolute;
		width: 12px;
		height: 12px;
		border-color: var(--g);
		border-style: solid;
	}

	.cmd-panel--dim .cmd-corner {
		border-color: rgba(0, 255, 65, 0.2);
	}

	.cmd-corner.tl {
		top: -1px;
		left: -1px;
		border-width: 2px 0 0 2px;
	}

	.cmd-corner.br {
		bottom: -1px;
		right: -1px;
		border-width: 0 2px 2px 0;
	}

	.cmd-icon {
		font-size: 2.2rem;
		color: var(--g);
		text-shadow: 0 0 12px rgba(0, 255, 65, 0.5);
		flex-shrink: 0;
		line-height: 1;
	}

	.cmd-info {
		flex: 1;
	}

	.cmd-title {
		font-family: var(--fh);
		font-size: 0.65rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		color: var(--g);
		margin-bottom: 0.3rem;
	}

	.cmd-desc {
		font-family: var(--ft);
		font-size: 0.88rem;
		color: var(--g-dim);
		line-height: 1.3;
	}

	.cmd-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.4rem 0.9rem;
		font-family: var(--fh);
		font-size: 0.55rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		color: var(--g);
		background: rgba(0, 255, 65, 0.08);
		border: 1px solid var(--g-border);
		text-decoration: none;
		white-space: nowrap;
		transition:
			background 0.2s,
			box-shadow 0.2s;
		cursor: pointer;
	}

	.cmd-btn:hover {
		background: rgba(0, 255, 65, 0.16);
		box-shadow: 0 0 14px rgba(0, 255, 65, 0.25);
	}

	.cmd-btn--locked {
		border-color: rgba(0, 255, 65, 0.15);
		color: rgba(0, 255, 65, 0.25);
		background: transparent;
		cursor: not-allowed;
	}

	.cmd-btn--locked:hover {
		background: transparent;
		box-shadow: none;
	}

	.cmd-arrow {
		font-size: 1rem;
		line-height: 1;
	}

	/* ── Boot log ── */
	.boot-log {
		border: 1px solid rgba(0, 255, 65, 0.15);
		background: rgba(0, 8, 3, 0.7);
		padding: 0.8rem 1.2rem;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.boot-line {
		font-family: var(--ft);
		font-size: 0.88rem;
		color: rgba(0, 255, 65, 0.45);
		letter-spacing: 0.05em;
	}

	.boot-ts {
		color: rgba(0, 255, 65, 0.25);
		margin-right: 0.5rem;
	}
</style>
