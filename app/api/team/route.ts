import { auth0 } from "@/lib/auth/auth0";
import { getOrCreateUser } from "@/lib/services/users";
import { Team } from "@/lib/types";
import { supabaseClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

const supabase = supabaseClient();

export async function POST(req: Request) {
	const session = await auth0.getSession();
	if (!session?.user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const newTeam: Team = await req.json();

	const user = await getOrCreateUser();
	const userId = user?.id;
	if (!userId) return;
	const { data, error } = await supabase
		.from("teams")
		.insert([
			{
				name: newTeam.name,
				created_by: userId,
				updated_by: userId,
				deleted: false,
			},
		])
		.select()
		.single();
	if (error) {
		console.error("[CREATE_TEAM]", error);
		return NextResponse.json(
			{ error: "Failed to create team" },
			{ status: 500 }
		);
	}

	return NextResponse.json(data, { status: 201 });
}
