import { GameWithTeamsAndScores } from "./game";
import { Player } from "./player";

export interface Team {
	id: string;
	name: string;
	created_by?: string;
	updated_by?: string;
	created_at: string;
	updated_at: string;
	deleted: boolean;
	deleted_at?: string;
}

export interface TeamWithPlayers extends Team {
	players: Player[];
}

export interface TeamDetails {
	team: Team;
	players: Player[];
	games: GameWithTeamsAndScores[];
}
