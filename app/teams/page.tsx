import Navigation from "@/components/navigation/Navigation";
import PrimaryLink from "@/components/navigation/PrimaryLink";
import { auth0 } from "@/lib/auth/auth0";
import { getAllTeams } from "@/lib/services/teams";
import React from "react";
import { CgArrowsExpandUpRight } from "react-icons/cg";

export default async function page() {
	const session = await auth0.getSession();
	const user = session?.user;
	const teams = await getAllTeams();
	return (
		<div>
			<Navigation />
			<div className="text-center py-10 px-10 md:px-20 flex justify-between items-center flex-wrap">
				<h1 className="text-2xl font-bold mb-4">Teams</h1>
				{user && <PrimaryLink text="New Team" link="/teams/new" />}
			</div>
			<div className="px-10 md:px-20 flex flex-wrap gap-10">
				{teams &&
					teams.map((team) => (
						<div
							key={team.id}
							className="flex flex-col gap-5 shadow-lg shadow-blue-100 px-5 py-4 items-center rounded-md"
						>
							<h2>{team.name}</h2>
							<PrimaryLink
								text="View Team"
								link={`/teams/${team.id}`}
								icon={{
									iconComponent: <CgArrowsExpandUpRight />,
									positionRight: true,
								}}
							/>
						</div>
					))}
			</div>
		</div>
	);
}
