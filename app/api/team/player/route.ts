// app/api/players/route.ts
import { auth0 } from "@/lib/auth/auth0";
import { NextResponse } from "next/server";
import { supabaseClient } from "@/utils/supabase/client";
import { TeamPlayer } from "@/lib/types";
import { getOrCreateUser } from "@/lib/services/users";

const supabase = supabaseClient();

export async function POST(req: Request) {
	const session = await auth0.getSession();
	if (!session?.user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const newTeamPlayer: TeamPlayer = await req.json();

	const user = await getOrCreateUser();
	const userId = user?.id;
	if (!userId) return;
	const { data, error } = await supabase
		.from("team_players")
		.insert([
			{
				team_id: newTeamPlayer.team_id,
				player_id: newTeamPlayer.player_id,
			},
		])
		.select()
		.single();
	if (error) {
		console.error("[CREATE_TEAM_PLAYER]", error);
		return NextResponse.json(
			{ error: "Failed to add player to team" },
			{ status: 500 }
		);
	}

	return NextResponse.json(data, { status: 201 });
}
