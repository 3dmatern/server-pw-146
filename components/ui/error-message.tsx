import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = {
    message?: string | string[]
};

export function ErrorMessage({ message, className }: Props & HTMLAttributes<HTMLParagraphElement>) {
    if (!message) return undefined;
    return (
        <p
            className={cn(
              `
                  py-1 px-2 text-sm text-center text-red-700 font-medium
                  border border-red-500 bg-red-100 rounded-md break-words
              `,
              className || ""
            )}
        >
            {message}
        </p>
    );
};