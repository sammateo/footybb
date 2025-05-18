export interface User {
	id: string;
	auth0_id: string;
	name?: string;
	email?: string;
	created_at: string;
	updated_at: string;
	deleted: boolean;
	deleted_at?: string;
}
