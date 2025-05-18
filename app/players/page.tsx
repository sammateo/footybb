import Navigation from "@/components/navigation/Navigation";
import PrimaryLink, {
	ButtonInterfaceIcon,
} from "@/components/navigation/PrimaryLink";
import { auth0 } from "@/lib/auth/auth0";
import { getAllPlayers } from "@/lib/services/players";
import { Player } from "@/lib/types";
import React from "react";
import { CgArrowsExpandUpRight, CgProfile } from "react-icons/cg";

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
							const buttonIcon: ButtonInterfaceIcon = {
								iconComponent: <CgArrowsExpandUpRight />,
								positionRight: true,
							};
							return (
								<li
									key={player.id}
									className="shadow-xl w-72 max-w-11/12 rounded-md px-10 py-5 flex flex-col gap-5 justify-center items-center"
								>
									<CgProfile className="text-4xl" />
									<p>{player.name}</p>
									<p>{player.position ?? "N/A"}</p>
									<p>#{player.number ?? "-"}</p>
									<PrimaryLink
										link={`/players/${player.id}`}
										text="View"
										icon={buttonIcon}
									/>
								</li>
							);
						})}
				</ul>
			</div>
		</div>
	);
}
