export interface Score {
	game_id: string;
	team_id: string;
	score: number;
	created_by?: string;
	updated_by?: string;
	created_at: string;
	updated_at: string;
	deleted: boolean;
	deleted_at?: string;
}
