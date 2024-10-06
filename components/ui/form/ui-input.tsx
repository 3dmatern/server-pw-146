import { InputHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export function UiInput(
    { className, ...rest }: InputHTMLAttributes<HTMLInputElement>
): React.ReactElement<HTMLInputElement> {
    return (
        <input
            {...rest}
            className={cn(
                `
                    w-full p-1.5 block rounded-md border-0 text-gray-800
                    shadow-sm ring-1 ring-inset ring-gray-300 outline-none
                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                    focus:ring-teal-600 sm:text-sm sm:leading-6 transition-colors
                `,
                className ? className : ""
            )}
        />
    );
};