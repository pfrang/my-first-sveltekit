<script lang="ts">
	import Loader from '$lib/components/loader.svelte';

	let editModeIndex = $state(-1);

	const { data } = $props();

	function orderId(id: number) {
		return `ORD-${String(id).padStart(4, '0')}`;
	}
</script>

<div class="mission-log">
	<!-- ── Header ── -->
	<div class="log-header">
		<div class="log-title-block">
			<span class="log-icon">▤</span>
			<div>
				<h1 class="log-title">IMPERIAL ORDER DATABASE</h1>
				<div class="log-sub">CLASSIFIED // COMMAND ACCESS // OUTER RIM SECTOR 7-G</div>
			</div>
		</div>
		<div class="log-meta">
			<span>RECORDS: LIVE</span>
			<span class="blink-soft" style="color: var(--g)">● SYNC ACTIVE</span>
		</div>
	</div>

	<!-- ── Divider ── -->
	<div class="h-sep">
		<div class="sep-line"></div>
		<span class="sep-label">// ACTIVE ORDERS //</span>
		<div class="sep-line"></div>
	</div>

	<!-- ── Orders list ── -->
	<div class="orders-list">
		{#await data.todos}
			<Loader />
		{:then todos}
			{#if todos.length === 0}
				<div class="empty-state">
					<div class="empty-icon">◎</div>
					<div>NO ACTIVE ORDERS IN DATABASE</div>
					<div class="empty-sub">ENTER A NEW ORDER BELOW TO POPULATE THE DATABASE</div>
				</div>
			{:else}
				{#each todos as todo, i}
					<div class="order-row" class:editing={editModeIndex === todo.id}>
						<!-- Order index badge -->
						<div class="order-badge">
							<span class="order-seq">{String(i + 1).padStart(2, '0')}</span>
						</div>

						<!-- Status indicator -->
						<span class="order-dot blink-soft"></span>

						<!-- Order ID -->
						<span class="order-id">{orderId(todo.id)}</span>

						<!-- Content / edit form -->
						<div class="order-content">
							{#if editModeIndex === todo.id}
								<form method="POST" action="?/edit" class="edit-form">
									<input type="hidden" name="id" value={todo.id} />
									<span class="input-prompt">&gt;</span>
									<input
										class="order-input"
										autofocus
										name="title"
										value={todo.title}
										spellcheck="false"
									/>
									<button type="submit" class="action-btn action-btn--confirm">
										[CONFIRM]
									</button>
									<button
										type="button"
										class="action-btn action-btn--cancel"
										onclick={() => (editModeIndex = -1)}
									>
										[ABORT]
									</button>
								</form>
							{:else}
								<span class="order-title">{todo.title}</span>
							{/if}
						</div>

						<!-- Actions -->
						{#if editModeIndex !== todo.id}
							<div class="order-actions">
								<button
									type="button"
									class="action-btn action-btn--edit"
									onclick={() => (editModeIndex = todo.id)}
								>
									[EDIT]
								</button>
								<form method="POST" action="?/delete" style="display:inline">
									<input type="hidden" name="id" value={todo.id} />
									<button type="submit" class="action-btn action-btn--delete">[PURGE]</button>
								</form>
							</div>
						{/if}
					</div>
				{/each}
			{/if}
		{:catch error}
			<div class="error-state">
				<span style="color: var(--red)">◈ DATABASE ERROR</span>
				<span>{error.message}</span>
			</div>
		{/await}
	</div>

	<!-- ── New order input ── -->
	<div class="h-sep" style="margin-top: 0.5rem;">
		<div class="sep-line"></div>
		<span class="sep-label">// TRANSMIT NEW ORDER //</span>
		<div class="sep-line"></div>
	</div>

	<div class="input-panel">
		<div class="panel-corner tl"></div>
		<div class="panel-corner br"></div>
		<div class="input-label">
			<span class="input-label-icon">◈</span>
			COMMAND TERMINAL — ENTER ORDER BELOW
		</div>
		<form action="?/add" method="POST" class="add-form">
			<div class="input-row">
				<span class="input-prompt">&gt;_</span>
				<input
					name="title"
					type="text"
					placeholder="INPUT ORDER DESCRIPTION..."
					class="order-input order-input--main"
					spellcheck="false"
					autocomplete="off"
				/>
			</div>
			<button type="submit" class="submit-btn">
				<span>◈</span>
				TRANSMIT ORDER
			</button>
		</form>
	</div>
</div>

<style>
	.mission-log {
		max-width: 900px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
		font-family: var(--ft);
	}

	/* ── Header ── */
	.log-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 0;
	}

	.log-title-block {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.log-icon {
		font-size: 2.5rem;
		color: var(--g);
		text-shadow: 0 0 14px rgba(0, 255, 65, 0.55);
		line-height: 1;
	}

	.log-title {
		font-family: var(--fh);
		font-size: clamp(0.9rem, 2.2vw, 1.3rem);
		font-weight: 900;
		letter-spacing: 0.2em;
		color: var(--g);
		text-shadow: 0 0 16px rgba(0, 255, 65, 0.5);
		margin: 0 0 0.2rem;
	}

	.log-sub {
		font-size: 0.82rem;
		color: var(--g-dim);
		letter-spacing: 0.12em;
	}

	.log-meta {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.3rem;
		font-size: 0.85rem;
		color: var(--g-dim);
		letter-spacing: 0.1em;
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
		font-size: 0.8rem;
		color: rgba(0, 255, 65, 0.32);
		letter-spacing: 0.14em;
		white-space: nowrap;
	}

	/* ── Orders list ── */
	.orders-list {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.order-row {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		padding: 0.6rem 1rem;
		background: var(--panel);
		border: 1px solid var(--g-border);
		border-left: 3px solid var(--g);
		transition:
			background 0.2s,
			box-shadow 0.2s;
		position: relative;
	}

	.order-row:hover {
		background: rgba(0, 255, 65, 0.05);
		box-shadow: 0 0 20px rgba(0, 255, 65, 0.12);
	}

	.order-row.editing {
		border-left-color: var(--amber);
		background: rgba(255, 170, 0, 0.04);
	}

	.order-badge {
		width: 28px;
		height: 28px;
		border: 1px solid var(--g-border);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		background: rgba(0, 255, 65, 0.06);
	}

	.order-seq {
		font-family: var(--fh);
		font-size: 0.5rem;
		color: var(--g-dim);
		letter-spacing: 0.05em;
	}

	.order-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--g);
		box-shadow: 0 0 6px var(--g);
		flex-shrink: 0;
	}

	.order-id {
		font-family: var(--fh);
		font-size: 0.55rem;
		color: rgba(0, 255, 65, 0.45);
		letter-spacing: 0.1em;
		min-width: 72px;
		flex-shrink: 0;
	}

	.order-content {
		flex: 1;
		overflow: hidden;
	}

	.order-title {
		font-size: 1.1rem;
		color: var(--g);
		letter-spacing: 0.06em;
	}

	.order-actions {
		display: flex;
		gap: 0.5rem;
		flex-shrink: 0;
	}

	/* ── Action buttons ── */
	.action-btn {
		font-family: var(--fh);
		font-size: 0.52rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		padding: 0.25rem 0.6rem;
		border: 1px solid;
		background: transparent;
		cursor: pointer;
		transition:
			background 0.15s,
			box-shadow 0.15s;
	}

	.action-btn--edit {
		color: rgba(0, 255, 65, 0.6);
		border-color: rgba(0, 255, 65, 0.25);
	}

	.action-btn--edit:hover {
		color: var(--g);
		background: rgba(0, 255, 65, 0.1);
		border-color: var(--g-border);
	}

	.action-btn--delete {
		color: rgba(255, 34, 85, 0.7);
		border-color: rgba(255, 34, 85, 0.25);
	}

	.action-btn--delete:hover {
		color: var(--red);
		background: rgba(255, 34, 85, 0.1);
		border-color: rgba(255, 34, 85, 0.5);
		box-shadow: 0 0 10px rgba(255, 34, 85, 0.2);
	}

	.action-btn--confirm {
		color: var(--g);
		border-color: var(--g-border);
	}

	.action-btn--confirm:hover {
		background: rgba(0, 255, 65, 0.15);
		box-shadow: 0 0 10px var(--g-glow);
	}

	.action-btn--cancel {
		color: rgba(0, 255, 65, 0.4);
		border-color: rgba(0, 255, 65, 0.15);
	}

	.action-btn--cancel:hover {
		color: var(--amber);
		border-color: rgba(255, 170, 0, 0.4);
	}

	/* ── Edit form ── */
	.edit-form {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		width: 100%;
	}

	/* ── Input ── */
	.input-prompt {
		font-family: var(--ft);
		font-size: 1.1rem;
		color: var(--g);
		flex-shrink: 0;
	}

	.order-input {
		background: transparent;
		border: none;
		border-bottom: 1px solid var(--g-border);
		color: var(--g);
		font-family: var(--ft);
		font-size: 1.1rem;
		letter-spacing: 0.06em;
		outline: none;
		padding: 0.1rem 0.3rem;
		flex: 1;
		caret-color: var(--g);
	}

	.order-input::placeholder {
		color: rgba(0, 255, 65, 0.25);
		font-size: 1rem;
	}

	.order-input:focus {
		border-bottom-color: var(--g);
		box-shadow: 0 2px 0 0 rgba(0, 255, 65, 0.3);
	}

	/* ── Input panel ── */
	.input-panel {
		position: relative;
		background: var(--panel);
		border: 1px solid var(--g-border);
		padding: 1.2rem 1.5rem;
		box-shadow: 0 0 20px var(--g-glow);
	}

	.panel-corner {
		position: absolute;
		width: 12px;
		height: 12px;
		border-color: var(--g);
		border-style: solid;
	}

	.panel-corner.tl {
		top: -1px;
		left: -1px;
		border-width: 2px 0 0 2px;
	}

	.panel-corner.br {
		bottom: -1px;
		right: -1px;
		border-width: 0 2px 2px 0;
	}

	.input-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--fh);
		font-size: 0.55rem;
		color: rgba(0, 255, 65, 0.45);
		letter-spacing: 0.18em;
		margin-bottom: 0.9rem;
	}

	.input-label-icon {
		font-size: 0.9rem;
	}

	.add-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.input-row {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.order-input--main {
		font-size: 1.2rem;
	}

	.submit-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		align-self: flex-start;
		padding: 0.5rem 1.6rem;
		font-family: var(--fh);
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		color: var(--g);
		background: rgba(0, 255, 65, 0.09);
		border: 1px solid var(--g-border);
		cursor: pointer;
		transition:
			background 0.2s,
			box-shadow 0.2s;
	}

	.submit-btn:hover {
		background: rgba(0, 255, 65, 0.18);
		box-shadow: 0 0 20px rgba(0, 255, 65, 0.28);
	}

	/* ── Empty / error states ── */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 3rem;
		border: 1px dashed rgba(0, 255, 65, 0.2);
		color: rgba(0, 255, 65, 0.35);
		font-family: var(--ft);
		font-size: 1rem;
		letter-spacing: 0.15em;
		text-align: center;
	}

	.empty-icon {
		font-size: 3rem;
		opacity: 0.3;
		margin-bottom: 0.5rem;
	}

	.empty-sub {
		font-size: 0.82rem;
		color: rgba(0, 255, 65, 0.2);
		margin-top: 0.3rem;
	}

	.error-state {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding: 1.5rem;
		border: 1px solid rgba(255, 34, 85, 0.3);
		background: rgba(255, 34, 85, 0.05);
		font-size: 1rem;
		letter-spacing: 0.1em;
		color: var(--g-dim);
	}
</style>
