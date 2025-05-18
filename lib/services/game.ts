import { supabaseClient } from "@/utils/supabase/client";
import {
	GameWithTeamsAndScores,
	GameWithTeamsAndScoresAndPlayers,
	Player,
	TeamWithPlayers,
} from "@/lib/types";

const supabase = supabaseClient();
export async function getGameWithTeamsAndScores(
	id: string
): Promise<GameWithTeamsAndScores | null> {
	const { data, error } = await supabase
		.from("games")
		.select(
			`
        *,
        team_a:team_a_id (id, name, deleted),
        team_b:team_b_id (id, name, deleted),
        scores (
          *,
          team:team_id (id, name)
        )
      `
		)
		.eq("id", id)
		.eq("deleted", false)
		.maybeSingle();

	if (error) {
		console.error("[getGameWithTeamsAndScores] error:", error);
		return null;
	}

	return data as GameWithTeamsAndScores;
}

export async function getGameWithTeamsAndScoresAndPlayers(
	id: string
): Promise<GameWithTeamsAndScoresAndPlayers | null> {
	const { data, error } = await supabase
		.from("games")
		.select(
			`
		*,
		team_a:team_a_id (
		  id,
		  name,
		  deleted,
		  players:team_players (
			player:player_id (
			  id,
			  name,
			  position,
			  number
			)
		  )
		),
		team_b:team_b_id (
		  id,
		  name,
		  deleted,
		  players:team_players (
			player:player_id (
			  id,
			  name,
			  position,
			  number
			)
		  )
		),
		scores (
		  *,
		  team:team_id (
			id,
			name
		  )
		)
	  `
		)
		.eq("id", id)
		.eq("deleted", false)
		.maybeSingle();

	if (error) {
		console.error("[getGameWithTeamsAndPlayers] error:", error);
		return null;
	}
	// Flatten team_a.players → Player[]
	const flattenPlayers = (teamData: {
		id: string;
		name: string;
		created_by?: string;
		updated_by?: string;
		created_at: string;
		updated_at: string;
		deleted: boolean;
		deleted_at?: string;
		players: {
			player: Player;
		}[];
	}): TeamWithPlayers => {
		const players = (teamData?.players ?? []).map((tp) => tp.player);
		return { ...teamData, players };
	};

	return {
		...data,
		team_a: data?.team_a ? flattenPlayers(data.team_a) : undefined,
		team_b: data?.team_b ? flattenPlayers(data.team_b) : undefined,
	} as GameWithTeamsAndScoresAndPlayers;
}
