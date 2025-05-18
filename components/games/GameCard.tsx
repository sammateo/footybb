import React from "react";
import PrimaryLink from "../navigation/PrimaryLink";
import { CgArrowsExpandUpRight } from "react-icons/cg";
import { GameWithTeamsAndScores } from "@/lib/types";
import { GrLocationPin } from "react-icons/gr";

export const GameCard = ({ game }: { game: GameWithTeamsAndScores }) => {
	return (
		<div className="shadow-lg rounded-md w-80 max-w-11/12 p-4 flex flex-col gap-4">
			<div className="flex flex-col justify-center items-center">
				<p className="flex items-center gap-2">
					<GrLocationPin /> {game.location}
				</p>
				<p className="capitalize">{game.status}</p>
			</div>
			<div className="grid grid-cols-2 text-center">
				<div>
					<p>{game.team_a?.name}</p>
					<p>
						{
							game.scores?.find(
								(score) => score.team_id == game.team_a_id
							)?.score
						}
					</p>
				</div>
				<div>
					<p>{game.team_b?.name}</p>
					<p>
						{
							game.scores?.find(
								(score) => score.team_id == game.team_b_id
							)?.score
						}
					</p>
				</div>
			</div>
			<div>
				<PrimaryLink
					text="View"
					link={`/games/${game.id}`}
					icon={{
						iconComponent: <CgArrowsExpandUpRight />,
						positionRight: true,
					}}
					// className="flex items-center gap-2 bg-blue-600 text-white px-8 py-1 rounded-full w-fit"
				></PrimaryLink>
			</div>
		</div>
	);
};
