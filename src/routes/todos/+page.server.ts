import type { Actions, PageServerLoad } from './$types';
import db from '$lib/db';
import type { Todo } from '$lib/types/todo';

export const load: PageServerLoad = async () => {
	try {
		const todos = db.prepare('SELECT * FROM todo').all() as Todo[];
		return {
			todos
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
	}
} satisfies Actions;
