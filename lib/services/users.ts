// lib/db/users.ts
import { supabaseClient } from "@/utils/supabase/client";
import { auth0 } from "@/lib/auth/auth0";
import { User } from "../types";

export async function getOrCreateUser() {
	const supabase = supabaseClient();
	const session = await auth0.getSession();

	const authUser = session?.user;
	if (!authUser) return null;

	const auth0Id = authUser.sub;
	const name = authUser.name || "";
	const email = authUser.email || "";

	// Check if the user exists
	const { data: existing, error: findError } = await supabase
		.from("users")
		.select("*")
		.eq("auth0_id", auth0Id)
		.maybeSingle();

	if (findError) throw new Error("Error fetching user from DB");

	if (existing) return existing as User;

	// Create the user if it doesn't exist
	const { data: created, error: createError } = await supabase
		.from("users")
		.insert([
			{
				auth0_id: auth0Id,
				name,
				email,
			},
		])
		.select()
		.single();

	if (createError) throw new Error("Error creating user in DB");

	return created as User;
}
