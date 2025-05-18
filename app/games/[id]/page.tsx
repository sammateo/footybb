import React from "react";
import { getGameWithTeamsAndScoresAndPlayers } from "@/lib/services/game";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import Navigation from "@/components/navigation/Navigation";
import SecondaryLink from "@/components/navigation/SecondaryLink";
type Props = {
	params: {
		id: string;
	};
};

export default async function page({ params }: Props) {
	const { id } = await params;

	const game = await getGameWithTeamsAndScoresAndPlayers(id);

	if (!game) return notFound();
	const { team_a, team_b, scores } = game;

	return (
		<div className="">
			<Navigation />
			<div className="text-center py-10 text-4xl font-bold">
				<h1 className="text-2xl font-bold mb-4">Game Details</h1>
			</div>
			<div className="px-10 md:px-20">
				<div className="mb-6">
					<p>
						<strong>Date:</strong>{" "}
						{new Date(game.game_date ?? "").toLocaleString()}
					</p>
					<p>
						<strong>Location:</strong> {game.location || "TBD"}
					</p>
					<p>
						<strong>Status:</strong> {game.status}
					</p>
				</div>

				<div className="grid grid-cols-2 gap-4 mb-6">
					<div>
						<h2 className="font-semibold">Team A</h2>
						<p>{team_a?.name ?? "Unknown"}</p>
					</div>
					<div>
						<h2 className="font-semibold">Team B</h2>
						<p>{team_b?.name ?? "Unknown"}</p>
					</div>
				</div>

				<div>
					<h2 className="text-lg font-semibold mb-2">Scores</h2>
					<ul className="space-y-1">
						{scores?.map((score) => (
							<li key={score.team_id}>
								{team_a?.id == score.team_id
									? team_a?.name
									: team_b?.id == score.team_id
									? team_b.name
									: "Unknown"}
								: {score.score}
							</li>
						)) ?? <p>No scores yet.</p>}
					</ul>
				</div>

				<div>
					<h2 className="text-lg font-semibold mb-2">Players</h2>
					<div className="grid grid-cols-2 gap-4 mb-6">
						<div>
							<h2 className="font-semibold">
								{team_a?.name ?? "Team A"}
							</h2>
							<ul>
								{team_a?.players.map((p) => (
									<li key={p.id}>
										{p.name} ({p.position}) #{p.number}
									</li>
								))}
							</ul>
						</div>
						<div>
							<h2 className="font-semibold">
								{team_b?.name ?? "Team B"}
							</h2>
							<ul>
								{team_b?.players.map((p) => (
									<li key={p.id}>
										{p.name} ({p.position}) #{p.number}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				<SecondaryLink
					text="Back to Dashboard"
					link={`/`}
					icon={{
						iconComponent: <BiArrowBack />,
						positionRight: false,
					}}
				></SecondaryLink>
			</div>
		</div>
	);
}
