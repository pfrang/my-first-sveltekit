import type { Actions, PageServerLoad } from './$types';
import db from '$lib/db';
import type { Todo } from '$lib/types/todo';

export const load: PageServerLoad = async () => {
	try {
		const getTodos = async () => {
			const todos = db.prepare('SELECT * FROM todo').all() as Todo[];
			await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
			return todos;
		};

		return {
			todos: getTodos()
		};
	} catch (e) {
		console.error('Error connecting to database:', e);
	}
};

export const actions = {
	add: async ({ request }) => {
		const formData = await request.formData();
		const title = formData.get('title') as string;
		if (title) {
			db.prepare('INSERT INTO todo (title) VALUES (?)').run(title);
		}
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		if (id) {
			db.prepare('DELETE FROM todo WHERE id = ?').run(id);
		}
	},
	edit: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const title = formData.get('title') as string;
		if (id && title) {
			db.prepare('UPDATE todo SET title = ? WHERE id = ?').run(title, id);
		}
	}
} satisfies Actions;
