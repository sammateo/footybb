import { AddPlayerToTeamForm } from "@/components/forms/AddPlayerToTeamForm";
import { GameCard } from "@/components/games/GameCard";
import Navigation from "@/components/navigation/Navigation";
import { PlayerCard } from "@/components/players/PlayerCard";
import { auth0 } from "@/lib/auth/auth0";
import { getAllPlayers } from "@/lib/services/players";
import { getTeamDetails } from "@/lib/services/teams";
import React from "react";
type Props = {
	params: Promise<{
		id: string;
	}>;
};
const page = async ({ params }: Props) => {
	const { id } = await params;
	const session = await auth0.getSession();
	const user = session?.user;
	const teamDetails = await getTeamDetails(id);
	const allPlayers = await getAllPlayers();

	return (
		<div>
			<Navigation />
			<div className="px-10 md:px-20 space-y-4">
				<h1 className="text-2xl font-bold mb-4">
					Team Details: {teamDetails?.team.name}
				</h1>
				<div>
					<div className="flex flex-wrap items-center justify-between">
						<h2>Players:</h2>
						{user && (
							<AddPlayerToTeamForm
								players={allPlayers}
								teamId={teamDetails?.team.id || ""}
							/>
						)}
					</div>
					<div className="flex gap-10 flex-wrap ">
						{teamDetails?.players.map((player) => (
							<PlayerCard key={player.id} player={player} />
						))}
					</div>
				</div>
				<div>
					<h2>Games</h2>
					<div>
						{teamDetails?.games.map((game) => (
							<GameCard key={game.id} game={game} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
