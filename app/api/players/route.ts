// app/api/players/route.ts
import { auth0 } from "@/lib/auth/auth0";
import { NextResponse } from "next/server";
import { supabaseClient } from "@/utils/supabase/client";
import { Player } from "@/lib/types";
import { getOrCreateUser } from "@/lib/services/users";

const supabase = supabaseClient();

export async function POST(req: Request) {
	const session = await auth0.getSession();
	if (!session?.user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const newPlayer: Player = await req.json();

	const user = await getOrCreateUser();
	const userId = user?.id;
	if (!userId) return;
	const { data, error } = await supabase
		.from("players")
		.insert([
			{
				name: newPlayer.name,
				position: newPlayer.position,
				number: newPlayer.number,
				created_by: userId,
				updated_by: userId,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				deleted: false,
			},
		])
		.select()
		.single();
	if (error) {
		console.error("[CREATE_PLAYER]", error);
		return NextResponse.json(
			{ error: "Failed to create player" },
			{ status: 500 }
		);
	}

	return NextResponse.json(data, { status: 201 });
}
