import { LabelHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type Props = {
    label?: string;
}

export function UiLabel({
    className,
    label,
    children,
    ...rest
}: Props & LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label
            className={cn(
                "w-full flex flex-col items-start text-gray-500 gap-1",
                className || ""
            )}
            {...rest}
        >
          {
            label ?
              <>
                <span>{label}</span>
                {children}
              </> :
              children
            }
        </label>
    );
};