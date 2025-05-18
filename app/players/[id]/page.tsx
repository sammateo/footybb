import SecondaryButton from "@/components/buttons/SecondaryButton";
import Navigation from "@/components/navigation/Navigation";
import PrimaryLink from "@/components/navigation/PrimaryLink";
import SecondaryLink from "@/components/navigation/SecondaryLink";
import { DeletePlayerButton } from "@/components/players/DeletePlayerButton";
import { auth0 } from "@/lib/auth/auth0";
import { deletePlayer, getPlayerDetails } from "@/lib/services/players";
import { PlayerDetails } from "@/lib/types";
import { notFound } from "next/navigation";
import React from "react";
import { CgArrowsExpandUpRight } from "react-icons/cg";
type Props = {
	params: Promise<{
		id: string;
	}>;
};

export default async function page({ params }: Props) {
	const { id } = await params;
	const session = await auth0.getSession();
	const user = session?.user;
	const player: PlayerDetails | null = await getPlayerDetails(id);
	if (!player) return notFound();
	return (
		<div>
			<Navigation />
			<div className="px-10 md:px-20 py-20 space-y-4">
				<div className="flex flex-wrap justify-between items-center gap-4">
					<h1 className="text-2xl font-semibold text-center">
						{player.name}
					</h1>
					{user && <DeletePlayerButton playerId={player.id} />}
				</div>

				<div className="flex flex-col gap-4">
					<h2 className="text-xl font-medium">Teams:</h2>
					<div className="flex gap-10 flex-wrap">
						{player.teams.map(({ team, games, teammates }) => (
							<div
								key={team.id}
								className="shadow-xl border-2 w-96 max-w-11/12 border-blue-600 rounded-md px-8 py-4"
							>
								<h2 className="text-xl font-medium text-center">
									{team.name ?? "Unkown"}
								</h2>
								<h3>Teammates:</h3>
								<div className="flex flex-wrap gap-4">
									{teammates.map((p) => (
										<PrimaryLink
											key={p.id}
											text={p.name}
											link={`/players/${p.id}`}
											icon={{
												iconComponent: (
													<CgArrowsExpandUpRight className="text-xl hidden sm:block" />
												),
												positionRight: true,
											}}
										/>
									))}
								</div>

								<h3>Games:</h3>
								<ul>
									{games.map((g) => (
										<li key={g.id}>
											{g.location} — {g.status}
										</li>
									))}
								</ul>
								<SecondaryLink
									text="View Team"
									link={`/teams/${team.id}`}
									icon={{
										iconComponent: (
											<CgArrowsExpandUpRight className="text-xl hidden sm:block" />
										),
										positionRight: true,
									}}
								/>
							</div>
						))}
					</div>
				</div>

				<div>
					<h2 className="text-xl font-medium">Goals:</h2>
					<ul>
						{player.goals.map((goal) => (
							<li key={goal.id}>
								Game at {goal.game.location}, min {goal.minute}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
