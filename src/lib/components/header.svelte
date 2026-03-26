<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<header>
	<nav class="flex gap-4 border-b">
		<a class="underline hover:no-underline" href={resolve('/')}>Home</a>
		<a class="underline hover:no-underline" href={resolve('/todos')}>Todos</a>
	</nav>
</header>
