import { HTMLAttributes } from "react";

type Props = {
    message?: string | string[]
};

export function ErrorMessage({ message }: Props & HTMLAttributes<HTMLParagraphElement>) {
    if (!message) return undefined;
    return (
        <p
            className="
                py-1 px-2 text-sm text-center text-green-700 font-medium
                border border-teal-500 bg-teal-100 rounded-md break-words
            "
        >
            {message}
        </p>
    );
};