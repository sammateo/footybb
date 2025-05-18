import { Player } from "@/lib/types";
import React from "react";
import { CgArrowsExpandUpRight, CgProfile } from "react-icons/cg";
import PrimaryLink from "../navigation/PrimaryLink";

export const PlayerCard = ({ player }: { player: Player }) => {
	return (
		<div className="shadow-xl w-72 max-w-11/12 rounded-md px-10 py-5 flex flex-col gap-5 justify-center items-center">
			<CgProfile className="text-4xl" />
			<p>{player.name}</p>
			<p>{player.position ?? "N/A"}</p>
			<p>#{player.number ?? "-"}</p>
			<PrimaryLink
				link={`/players/${player.id}`}
				text="View"
				icon={{
					iconComponent: <CgArrowsExpandUpRight />,
					positionRight: true,
				}}
			/>
		</div>
	);
};
