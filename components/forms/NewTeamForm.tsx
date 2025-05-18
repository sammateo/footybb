"use client";
import { useState } from "react";
import { Team } from "@/lib/types";
import PrimaryButton from "../buttons/PrimaryButton";
import { Toast } from "../alerts/ConfirmationDialog";
import { useRouter } from "next/navigation";
import SecondaryLink from "../navigation/SecondaryLink";
import { BiArrowBack } from "react-icons/bi";
import { insertTeam } from "@/lib/services/teams";

export const NewTeamForm = () => {
	const router = useRouter();
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
	const [newTeam, setNewTeam] = useState<Team>({
		name: "",
		id: "",
		created_at: "",
		updated_at: "",
		deleted: false,
	});
	const handleSubmit = async (e: React.FormEvent) => {
		setSubmitButtonDisabled(true);
		e.preventDefault();
		try {
			const insertNewTeamResult = await insertTeam(newTeam);
			if (insertNewTeamResult) {
				Toast.fire({
					icon: "success",
					title: "Team created successfully",
				}).then(() => {
					router.push("/teams");
				});
			}
		} catch (err) {
			console.error(err);
			setSubmitButtonDisabled(false);
			Toast.fire({
				icon: "error",
				title: "Failed to create team",
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
				value={newTeam?.name}
				onChange={(e) =>
					setNewTeam((prevTeam) => ({
						...prevTeam,
						name: e.target.value,
					}))
				}
				className="border outline-none placeholder:text-blue-600 border-blue-600 px-3 py-2 w-full rounded-full"
				required
			/>

			<PrimaryButton
				disabled={submitButtonDisabled}
				type="submit"
				text="Create Team"
			/>
			<SecondaryLink
				text="Back to Teams"
				link="/teams"
				icon={{
					iconComponent: <BiArrowBack />,
					positionRight: false,
				}}
			/>
		</form>
	);
};
