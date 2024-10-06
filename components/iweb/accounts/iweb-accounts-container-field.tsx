import { cn } from "@/lib/cn";
import { HTMLAttributes } from "react";

export function IwebAccountsContainerField({
    children,
    className,
    ...rest
}: HTMLAttributes<HTMLDivElement>) {
    return (
    <div
        className={cn(
            "w-full flex flex-row items-center justify-between",
            className || ""
        )}
        {...rest}
    >
        {children}
      </div>
    );
};