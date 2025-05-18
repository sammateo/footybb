import Navigation from "@/components/navigation/Navigation";
import Profile from "@/components/profile/Progile";
import React from "react";

export default function page() {
	return (
		<div className="min-h-screen flex flex-col">
			<Navigation />
			<Profile />
		</div>
	);
}
