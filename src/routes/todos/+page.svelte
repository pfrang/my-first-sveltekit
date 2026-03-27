<script lang="ts">
	let count = $state(0);

	const { data } = $props();
</script>

<p>Welcome to my todo</p>
<button onclick={() => count++}>Click me</button>
<p>{count}</p>

<div class="flex flex-col gap-4 px-16">
	<p>My todos</p>
	{#each data.todos as todo}
		<div class="flex justify-between rounded border border-gray-300 px-4 py-2">
			<p>{todo.title}</p>
			<form method="POST" action="?/delete">
				<input type="hidden" name="id" value={todo.id} />
				<button class="cursor-pointer underline hover:no-underline">Delete</button>
			</form>
		</div>
	{/each}
	<form action="?/add" method="POST" class="flex flex-col gap-4">
		<input
			name="title"
			type="text"
			placeholder="Todo title"
			class="rounded border border-gray-300 px-4 py-2"
		/>
		<button type="submit" class="rounded bg-blue-500 px-4 py-2 text-white">Add Todo</button>
	</form>
</div>
