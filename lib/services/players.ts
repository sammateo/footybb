import { supabaseClient } from "@/utils/supabase/client";
import { Player, PlayerDetails } from "../types";
import { auth0 } from "@/lib/auth/auth0";
import { getOrCreateUser } from "./users";

const supabase = supabaseClient();
export const getAllPlayers = async () => {
	const { data: players, error } = await supabase
		.from("players")
		.select("*")
		.eq("deleted", false)
		.order("created_at", { ascending: false });
	if (error) console.error(error);
	return players;
};

export const getPlayerDetails = async (
	playerId: string
): Promise<PlayerDetails | null> => {
	const { data, error } = await supabase
		.from("players")
		.select(
			`
      *,
    team_players (
      team:teams (
        *,
        team_players (
          player:players (
            id, name, position, number, created_by, updated_by, created_at, updated_at, deleted, deleted_at
          )
        ),
        team_a_games:games!games_team_a_id_fkey (
          *,
          team_a:team_a_id (id, name),
          team_b:team_b_id (id, name),
          scores (*)
        ),
        team_b_games:games!games_team_b_id_fkey (
          *,
          team_a:team_a_id (id, name),
          team_b:team_b_id (id, name),
          scores (*)
        )
      )
    ),
    goals (
      *,
      game:game_id (
        *,
        team_a:team_a_id (id, name),
        team_b:team_b_id (id, name)
      ),
      team:team_id (id, name)
    )
    `
		)
		.eq("id", playerId)
		.eq("deleted", false)
		.single();

	if (error || !data) {
		console.error("Failed to fetch player details:", error);
		return null;
	}
	const player: PlayerDetails = {
		...data,
		teams: data.team_players.map((tp: any) => {
			const team = tp.team;
			const teammates = (team.team_players ?? [])
				.map((tp: any) => tp.player)
				.filter((p: any) => p && p.id !== playerId);

			const games = [
				...(team.team_a_games ?? []),
				...(team.team_b_games ?? []),
			];

			return {
				team,
				teammates,
				games,
			};
		}),
		goals: data.goals.map((goal: any) => ({
			...goal,
			game: goal.game,
			team: goal.team,
		})),
	};

	return player;
};

export const insertPlayer = async (newPlayer: Player) => {
	const res = await fetch("/api/players", {
		method: "POST",
		body: JSON.stringify(newPlayer),
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!res.ok) {
		const error = await res.json();
		console.error(error);
		throw new Error(error?.error || "Failed to create player");
	}
	return await res.json();
};
