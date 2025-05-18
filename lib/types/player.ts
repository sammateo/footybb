import { Game, GameWithTeamsAndScores } from "./game";
import { Goal } from "./goal";
import { Team } from "./team";

export interface Player {
	id: string;
	name: string;
	position?: string;
	number?: number;
	created_by?: string; // user id
	updated_by?: string;
	created_at: string;
	updated_at: string;
	deleted: boolean;
	deleted_at?: string;
}

export interface TeamPlayer {
	team_id: string;
	player_id: string;
	created_by?: string;
	updated_by?: string;
	created_at: string;
	updated_at: string;
	deleted: boolean;
	deleted_at?: string;
}

export interface PlayerDetails extends Player {
	teams: {
		team: Team;
		teammates: Player[]; // Players on the same team
		games: GameWithTeamsAndScores[]; // Games that team played
	}[];

	goals: (Goal & {
		game: Game;
		team?: Team;
	})[];
}
