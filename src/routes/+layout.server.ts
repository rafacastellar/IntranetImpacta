import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	return {
		session: locals.session,
		user: locals.user,
		simulatedRole: locals.simulatedRole || 'Coordenador',
		cookies: cookies.getAll()
	};
};

