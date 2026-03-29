<script lang="ts">
	let color: string = '#000';
</script>

<svg
	class="animate-spin"
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	viewBox="0 0 24 24"
	width={24}
	height={24}
>
	<circle class="opacity-25" cx="12" cy="12" r="10" stroke={color} stroke-width="4"></circle>
	<path class="opacity-75" fill={color} d="M4 12a8 8 0 018-8V0a12 12 0 00-12 12h4z"></path>
</svg>
