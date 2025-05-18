import React from "react";
import { supabaseClient } from "@/utils/supabase/client";
import { GameWithTeamsAndScores } from "@/lib/types";
import { RiAddCircleLine } from "react-icons/ri";
import Navigation from "@/components/navigation/Navigation";
import PrimaryLink from "@/components/navigation/PrimaryLink";
import { auth0 } from "@/lib/auth/auth0";
import { GameCard } from "@/components/games/GameCard";
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

				<div className="flex flex-wrap justify-center">
					{error && <div>Error occurred</div>}
					{gamesWithTeamsAndScores &&
						gamesWithTeamsAndScores?.map((game) => (
							<GameCard key={game.id} game={game} />
						))}
				</div>
			</div>
		</div>
	);
}
