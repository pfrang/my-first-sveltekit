<div class="imperial-loader">
	<div class="loader-corners">
		<span class="lc tl"></span>
		<span class="lc tr"></span>
		<span class="lc bl"></span>
		<span class="lc br"></span>
	</div>

	<div class="loader-icon">◈</div>
	<div class="loader-title">ACCESSING IMPERIAL DATABASE</div>

	<div class="loader-bar-track">
		<div class="loader-bar-fill"></div>
		<div class="loader-bar-sweep"></div>
	</div>

	<div class="loader-lines">
		<div class="ll" style="--d: 0s">ESTABLISHING SECURE CHANNEL...</div>
		<div class="ll" style="--d: 0.4s">AUTHENTICATING COMMAND CREDENTIALS...</div>
		<div class="ll" style="--d: 0.8s">DECRYPTING DATASTREAM...</div>
		<div class="ll blink-soft" style="--d: 1.2s">PLEASE STAND BY <span class="blink">▮</span></div>
	</div>
</div>

<style>
	.imperial-loader {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.2rem;
		padding: 3rem 2rem;
		position: relative;
		font-family: var(--ft);
		color: var(--g);
		max-width: 500px;
		margin: 4rem auto;
		border: 1px solid var(--g-border);
		background: var(--panel);
		box-shadow: 0 0 40px var(--g-glow);
	}

	/* Corner brackets */
	.loader-corners {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.lc {
		position: absolute;
		width: 16px;
		height: 16px;
		border-color: var(--g);
		border-style: solid;
	}

	.lc.tl {
		top: -1px;
		left: -1px;
		border-width: 2px 0 0 2px;
	}

	.lc.tr {
		top: -1px;
		right: -1px;
		border-width: 2px 2px 0 0;
	}

	.lc.bl {
		bottom: -1px;
		left: -1px;
		border-width: 0 0 2px 2px;
	}

	.lc.br {
		bottom: -1px;
		right: -1px;
		border-width: 0 2px 2px 0;
	}

	/* Icon */
	.loader-icon {
		font-size: 2.8rem;
		color: var(--g);
		text-shadow: 0 0 20px rgba(0, 255, 65, 0.7);
		animation: spin-icon 3s linear infinite;
	}

	@keyframes spin-icon {
		0% {
			text-shadow: 0 0 12px rgba(0, 255, 65, 0.5);
		}
		50% {
			text-shadow:
				0 0 25px rgba(0, 255, 65, 0.9),
				0 0 50px rgba(0, 255, 65, 0.3);
		}
		100% {
			text-shadow: 0 0 12px rgba(0, 255, 65, 0.5);
		}
	}

	/* Title */
	.loader-title {
		font-family: var(--fh);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.22em;
		color: var(--g);
		text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
	}

	/* Progress bar */
	.loader-bar-track {
		width: 100%;
		height: 6px;
		background: rgba(0, 255, 65, 0.08);
		border: 1px solid var(--g-border);
		position: relative;
		overflow: hidden;
	}

	.loader-bar-fill {
		height: 100%;
		background: var(--g);
		box-shadow: 0 0 8px var(--g);
		animation: progress-fill 2.5s ease-in-out infinite;
	}

	.loader-bar-sweep {
		position: absolute;
		inset: 0;
		background: linear-gradient(90deg, transparent 0%, rgba(0, 255, 65, 0.5) 50%, transparent 100%);
		animation: sweep 1.5s ease-in-out infinite;
	}

	@keyframes sweep {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(200%);
		}
	}

	/* Log lines */
	.loader-lines {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		width: 100%;
	}

	.ll {
		font-size: 0.88rem;
		color: rgba(0, 255, 65, 0.45);
		letter-spacing: 0.07em;
		animation: fade-in 0.4s var(--d, 0s) ease both;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateX(-8px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
</style>
