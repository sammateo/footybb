"use client";
import React, { useRef, useState } from "react";
import { Toast } from "../alerts/ConfirmationDialog";
import { Player, TeamPlayer } from "@/lib/types";
import PrimaryButton from "../buttons/PrimaryButton";
import { insertTeamPlayer } from "@/lib/services/teams";
import { useRouter } from "next/navigation";
import SecondaryButton from "../buttons/SecondaryButton";

export const AddPlayerToTeamForm = ({
	players,
	teamId,
}: {
	players: Player[];
	teamId: string;
}) => {
	const router = useRouter();
	const playerInputRef = useRef<HTMLSelectElement>(null);
	const [showForm, setShowForm] = useState(false);
	const [newTeamPlayer, setNewTeamPlayer] = useState<TeamPlayer>({
		team_id: teamId,
		player_id: "",
		created_at: "",
		updated_at: "",
		deleted: false,
	});
	const handleSubmit = async (e: React.FormEvent) => {
		// setSubmitButtonDisabled(true)
		e.preventDefault();
		try {
			// console.log(playerInputRef.current?.value);
			// setNewTeamPlayer((prevPlayer) => ({
			// 	...prevPlayer,
			// 	player_id: playerInputRef.current?.value || "",
			// }));
			const teamPlayerToInsert = newTeamPlayer;
			teamPlayerToInsert.player_id = playerInputRef.current?.value || "";
			const insertNewPlayerResult = await insertTeamPlayer(
				teamPlayerToInsert
			);
			if (insertNewPlayerResult) {
				Toast.fire({
					icon: "success",
					title: "Player added to team successfully",
				});
				router.refresh();
			}
		} catch (err) {
			console.error(err);
			// setSubmitButtonDisabled(false);
			Toast.fire({
				icon: "error",
				title: "Failed to add player to team",
			});
		}
	};
	return (
		<div className="flex flex-wrap gap-4">
			<div>
				{showForm ? (
					<SecondaryButton
						text={showForm ? "Cancel" : "Add Player"}
						onClickFunction={() => {
							setShowForm(!showForm);
						}}
					/>
				) : (
					<PrimaryButton
						text={showForm ? "Cancel" : "Add Player"}
						onClickFunction={() => {
							setShowForm(!showForm);
						}}
					/>
				)}
			</div>
			{showForm && (
				<form
					onSubmit={handleSubmit}
					className="flex items-center flex-wrap gap-4 mb-10"
				>
					<select
						ref={playerInputRef}
						className="border outline-none placeholder:text-blue-600 border-blue-600 px-3 py-1 w-60 max-w-11/12 rounded-full"
						// onChange={(e) =>
						// 	setNewTeamPlayer((prevPlayer) => ({
						// 		...prevPlayer,
						// 		player_id: e.target.value,
						// 	}))
						// }
					>
						{players &&
							players.map((player) => (
								<option key={player.id} value={player.id}>
									{player.name}
								</option>
							))}
					</select>
					<PrimaryButton type="submit" text="Add Player" />
				</form>
			)}
		</div>
	);
};
