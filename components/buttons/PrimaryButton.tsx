import Link from "next/link";
import React from "react";
import { ButtonInterfaceIcon } from "../navigation/PrimaryLink";

export interface ButtonInterface {
	text: string;
	icon?: ButtonInterfaceIcon;
	type?: "submit" | "reset" | "button" | undefined;
	disabled?: boolean;
	onClickFunction?: () => void;
}
export default function PrimaryButton({
	text,
	icon,
	type,
	disabled,
	onClickFunction,
}: ButtonInterface) {
	return (
		<button
			type={type}
			disabled={disabled || false}
			onClick={onClickFunction}
			className="flex items-center gap-2 cursor-pointer border-2 border-blue-600 bg-blue-600 text-white transition-colors duration-500  hover:text-blue-600 hover:bg-white px-8 py-1 rounded-full w-fit"
		>
			{icon && !icon.positionRight && icon.iconComponent}
			{text}
			{icon && icon.positionRight && icon.iconComponent}
		</button>
	);
}
