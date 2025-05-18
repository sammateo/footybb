import Link from "next/link";
import React from "react";

export interface LinkInterface {
	text: string;
	icon?: ButtonInterfaceIcon;
	link: string;
}
export interface ButtonInterfaceIcon {
	iconComponent: React.ReactNode;
	positionRight: boolean;
}
export default function PrimaryLink({ text, icon, link }: LinkInterface) {
	return (
		<Link
			href={link}
			className="flex items-center gap-2 border-2 border-blue-600 bg-blue-600 text-white transition-colors duration-500  hover:text-blue-600 hover:bg-white px-8 py-1 rounded-full w-fit"
		>
			{icon && !icon.positionRight && icon.iconComponent}
			{text}
			{icon && icon.positionRight && icon.iconComponent}
		</Link>
	);
}
