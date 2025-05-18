import { Score } from "./score";
import { Team, TeamWithPlayers } from "./team";

export interface Game {
	id: string;
	team_a_id: string;
	team_b_id: string;
	game_date?: string;
	location?: string;
	status: "scheduled" | "ongoing" | "completed";
	created_by?: string;
	updated_by?: string;
	created_at: string;
	updated_at: string;
	deleted: boolean;
	deleted_at?: string;
}

export interface GameWithTeamsAndScores extends Game {
	team_a?: Team;
	team_b?: Team;
	scores?: Score[];
}

export interface GameWithTeamsAndScoresAndPlayers extends Game {
	team_a?: TeamWithPlayers;
	team_b?: TeamWithPlayers;
	scores?: (Score & { team?: Team })[];
}
