import type { Session, User, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/types/supabase';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>;
			safeGetSession: () => Promise<{ session: Session | null; user: User | null }>;
			session: Session | null;
			user: User | null;
			simulatedRole?: string;
		}
		interface PageData {
			session: Session | null;
			user: User | null;
			simulatedRole?: string;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module '$env/static/public' {
	export const PUBLIC_SUPABASE_URL: string;
	export const PUBLIC_SUPABASE_ANON_KEY: string;
}

declare module '$env/static/private' {
	export const SUPABASE_SERVICE_ROLE_KEY: string;
}

export {};
