import { supabaseClient } from "@/utils/supabase/client";
import {
	GameWithTeamsAndScores,
	Player,
	Team,
	TeamDetails,
	TeamPlayer,
} from "../types";

const supabase = supabaseClient();

export const getAllTeams = async (): Promise<Team[]> => {
	const { data: teams, error } = await supabase
		.from("teams")
		.select("*")
		.eq("deleted", false)
		.order("created_at", { ascending: false });
	if (error) console.error(error);
	return teams as Team[];
};

export async function getTeamDetails(
	teamId: string
): Promise<TeamDetails | null> {
	// Validate UUID input
	// const uuidRegex =
	// 	/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	// if (!uuidRegex.test(teamId)) return null;

	// 1. Fetch team + nested players
	const { data: teamData, error: teamError } = await supabase
		.from("teams")
		.select(
			`
        *,
        team_players (
          player:players (
            id, name, position, number, created_by, updated_by, created_at, updated_at, deleted, deleted_at
          )
        )
      `
		)
		.eq("id", teamId)
		.eq("deleted", false)
		.single();

	if (teamError || !teamData) {
		console.error("Failed to fetch team:", teamError);
		return null;
	}

	// 2. Fetch games where the team is team_a or team_b
	const { data: games, error: gameError } = await supabase
		.from("games")
		.select(
			`
        *,
        team_a:team_a_id (id, name),
        team_b:team_b_id (id, name),
        scores (*)
      `
		)
		.or(`team_a_id.eq.${teamId},team_b_id.eq.${teamId}`)
		.eq("deleted", false);

	if (gameError) {
		console.error("Failed to fetch games:", gameError);
		return null;
	}

	// 3. Build and return response
	return {
		team: {
			id: teamData.id,
			name: teamData.name,
			created_by: teamData.created_by,
			updated_by: teamData.updated_by,
			created_at: teamData.created_at,
			updated_at: teamData.updated_at,
			deleted: teamData.deleted,
			deleted_at: teamData.deleted_at,
		},
		players: (teamData.team_players ?? [])
			.map((tp: { player: Player }) => tp.player)
			.filter((p: Player) => !p.deleted),
		games: (games ?? []).filter((g: GameWithTeamsAndScores) => !g.deleted),
	};
}

export const insertTeamPlayer = async (newTeamPlayer: TeamPlayer) => {
	const res = await fetch("/api/team/player", {
		method: "POST",
		body: JSON.stringify(newTeamPlayer),
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!res.ok) {
		const error = await res.json();
		console.error(error);
		throw new Error(error?.error || "Failed to add player to team");
	}
	return await res.json();
};
