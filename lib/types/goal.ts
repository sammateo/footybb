export interface Goal {
	id: string;
	game_id: string;
	player_id: string;
	team_id: string;
	minute: number;
	created_by?: string;
	updated_by?: string;
	created_at: string;
	updated_at: string;
	deleted: boolean;
	deleted_at?: string;
}
