import Link from "next/link";
import React from "react";
import { LinkInterface } from "./PrimaryLink";

export default function SecondaryLink({ text, icon, link }: LinkInterface) {
	return (
		<Link
			href={link}
			className="flex items-center gap-2 border-2 border-blue-600 bg-white text-blue-600 transition-colors duration-500  hover:text-white hover:bg-blue-600 px-8 py-1 rounded-full w-fit"
		>
			{icon && !icon.positionRight && icon.iconComponent}
			{text}
			{icon && icon.positionRight && icon.iconComponent}
		</Link>
	);
}
