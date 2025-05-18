"use client";
import { useState } from "react";
import { Player } from "@/lib/types";
import { insertPlayer } from "@/lib/services/players";
import PrimaryButton from "../buttons/PrimaryButton";
import { Toast } from "../alerts/ConfirmationDialog";
import { useRouter } from "next/navigation";
import SecondaryButton from "../buttons/SecondaryButton";
import SecondaryLink from "../navigation/SecondaryLink";
import { BiArrowBack } from "react-icons/bi";

export const NewPlayerForm = () => {
	const router = useRouter();
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
	const [newPlayer, setNewPlayer] = useState<Player>({
		name: "",
		position: "",
		number: undefined,
		id: "",
		created_at: "",
		updated_at: "",
		deleted: false,
	});
	const handleSubmit = async (e: React.FormEvent) => {
		setSubmitButtonDisabled(true);
		e.preventDefault();
		try {
			const insertNewPlayerResult = await insertPlayer(newPlayer);
			Toast.fire({
				icon: "success",
				title: "Player created successfully",
			}).then(() => {
				router.push("/players");
			});
		} catch (err) {
			console.error(err);
			setSubmitButtonDisabled(false);
			Toast.fire({
				icon: "error",
				title: "Failed to create player",
			});
		}
	};
	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-y-5 items-center"
		>
			<input
				placeholder="Name"
				value={newPlayer?.name}
				onChange={(e) =>
					setNewPlayer((prevPlayer) => ({
						...prevPlayer,
						name: e.target.value,
					}))
				}
				className="border outline-none placeholder:text-blue-600 border-blue-600 px-3 py-2 w-full rounded-full"
				required
			/>
			<input
				placeholder="Position"
				value={newPlayer.position}
				onChange={(e) =>
					setNewPlayer((prevPlayer) => ({
						...prevPlayer,
						position: e.target.value,
					}))
				}
				className="border outline-none placeholder:text-blue-600 border-blue-600 px-3 py-2 w-full rounded-full"
			/>
			<input
				placeholder="Number"
				type="number"
				min={0}
				// value={newPlayer.number}
				onChange={(e) =>
					setNewPlayer((prevPlayer) => ({
						...prevPlayer,
						number: Number(e.target.value),
					}))
				}
				className="border outline-none placeholder:text-blue-600 border-blue-600 px-3 py-2 w-full rounded-full"
			/>
			<PrimaryButton
				disabled={submitButtonDisabled}
				type="submit"
				text="Create Player"
			/>
			<SecondaryLink
				text="Back to Players"
				link="/players"
				icon={{
					iconComponent: <BiArrowBack />,
					positionRight: false,
				}}
			/>
		</form>
	);
};
