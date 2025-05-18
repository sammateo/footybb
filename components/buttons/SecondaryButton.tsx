import React from "react";
import { ButtonInterface } from "./PrimaryButton";

export default function SecondaryButton({
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
			className="flex items-center cursor-pointer gap-2 border-2 border-blue-600 bg-blue-600 text-white transition-colors duration-500  hover:text-blue-600 hover:bg-white px-8 py-1 rounded-full w-fit"
		>
			{icon && !icon.positionRight && icon.iconComponent}
			{text}
			{icon && icon.positionRight && icon.iconComponent}
		</button>
	);
}
