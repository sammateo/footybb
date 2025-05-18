import { createClient, SupabaseClient } from "@supabase/supabase-js";
export function supabaseClient() {
	const supabase: SupabaseClient<any, "public", any> = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);
	return supabase;
}
