import { HTMLAttributes } from "react";

type Props = {
    message?: string | string[]
};

export function ErrorMessage({ message }: Props & HTMLAttributes<HTMLParagraphElement>) {
    if (!message) return undefined;
    return (
        <p
            className="
                py-1 px-2 text-sm text-center text-red-700 font-medium
                border border-red-500 bg-red-100 rounded-md break-words
            "
        >
            {message}
        </p>
    );
};