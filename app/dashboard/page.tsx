import React from "react";
import { supabaseClient } from "@/utils/supabase/client";
import { GameWithTeamsAndScores } from "@/lib/types";
import { GrLocationPin } from "react-icons/gr";
import { RiAddCircleLine } from "react-icons/ri";
import { CgArrowsExpandUpRight } from "react-icons/cg";
import Navigation from "@/components/navigation/Navigation";
import PrimaryLink from "@/components/navigation/PrimaryLink";
import { auth0 } from "@/lib/auth/auth0";
export default async function page() {
	const session = await auth0.getSession();
	const user = session?.user;
	const supabase = await supabaseClient();
	const { data, error } = await supabase
		.from("games")
		.select(
			`
      *,
      team_a:team_a_id (
        id, name, deleted
      ),
      team_b:team_b_id (
        id, name, deleted
      ),
      scores (
        *,
        team:team_id (id, name)
      )
    `
		)
		.eq("deleted", false);
	const gamesWithTeamsAndScores: GameWithTeamsAndScores[] | null = data;
	return (
		<div>
			<Navigation />
			<div className="text-center py-10 text-4xl font-bold">
				<h1>Dashboard</h1>
			</div>
			<div className="px-10 md:px-20 py-10 flex flex-col gap-y-5">
				<div className="flex flex-wrap justify-between items-center">
					<h2 className="text-3xl font-semibold">Games:</h2>
					{user && (
						<PrimaryLink
							text="New Game"
							link={`/`}
							icon={{
								iconComponent: (
									<RiAddCircleLine className="text-xl" />
								),
								positionRight: false,
							}}
						/>
					)}
				</div>

				<div>
					{gamesWithTeamsAndScores?.map((game) => (
						<div
							className="shadow-lg rounded-md w-80 max-w-11/12 p-4 flex flex-col gap-4"
							key={game.id}
						>
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
												(score) =>
													score.team_id ==
													game.team_a_id
											)?.score
										}
									</p>
								</div>
								<div>
									<p>{game.team_b?.name}</p>
									<p>
										{
											game.scores?.find(
												(score) =>
													score.team_id ==
													game.team_b_id
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
										iconComponent: (
											<CgArrowsExpandUpRight />
										),
										positionRight: true,
									}}
									// className="flex items-center gap-2 bg-blue-600 text-white px-8 py-1 rounded-full w-fit"
								></PrimaryLink>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
