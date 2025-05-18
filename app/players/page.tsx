import Navigation from "@/components/navigation/Navigation";
import PrimaryLink from "@/components/navigation/PrimaryLink";
import { PlayerCard } from "@/components/players/PlayerCard";
import { auth0 } from "@/lib/auth/auth0";
import { getAllPlayers } from "@/lib/services/players";
import { Player } from "@/lib/types";
import React from "react";

export default async function page() {
	const session = await auth0.getSession();
	const user = session?.user;
	const players = await getAllPlayers();
	return (
		<div>
			<Navigation />
			<div className="text-center py-10 px-10 md:px-20 flex justify-between items-center flex-wrap">
				<h1 className="text-2xl font-bold mb-4">Players</h1>
				{user && <PrimaryLink text="New Player" link="/players/new" />}
			</div>
			<div className="px-10 md:px-20">
				<ul className="space-y-2 flex gap-10 flex-wrap justify-center">
					{players &&
						players.map((player: Player) => {
							return (
								<PlayerCard key={player.id} player={player} />
							);
						})}
				</ul>
			</div>
		</div>
	);
}
