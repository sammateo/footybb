import Navigation from "@/components/navigation/Navigation";
import { redirect } from "next/navigation";

export default function Home() {
	redirect("/dashboard");
	return (
		<div className="flex gap-10">
			<Navigation />
		</div>
	);
}
