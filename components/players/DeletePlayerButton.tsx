"use client";
import React from "react";
import SecondaryButton from "../buttons/SecondaryButton";
import { deletePlayer } from "@/lib/services/players";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
export const DeletePlayerButton = ({ playerId }: { playerId: string }) => {
	const router = useRouter();
	return (
		<SecondaryButton
			onClickFunction={async () => {
				Swal.fire({
					title: "Are you sure?",
					text: "You won't be able to revert this!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Yes, delete it!",
				}).then(async (result) => {
					if (result.isConfirmed) {
						await deletePlayer(playerId);
						router.push("/players");
					}
				});
			}}
			text="Delete Player"
		/>
	);
};
