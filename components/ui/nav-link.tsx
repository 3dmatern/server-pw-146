"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

interface NavLinkProps {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "button"
}

export function NavLink({
    children,
    className,
    variant = "default",
    href,
    ...rest
}: NavLinkProps & LinkProps) {
    const pathname = usePathname();

    const onIsActiveClassName = (): string => {
        if (pathname === href.toString()) {
            if (variant === "button") {
                return "bg-blue-600";
            }
            return "text-teal-600";
        }
        return "";
    };

    return (
        <Link
            className={cn(
                "transition-colors",
                variant === "default" ? "hover:text-teal-600 " : "",
                variant === "button" ? `
                    py-1 px-2 bg-teal-600 text-white text-sm rounded-lg
                    hover:bg-teal-600/80
                ` : "",
                onIsActiveClassName() || "",
                className || ""
            )}
            href={href}
            {...rest}
        >
            {children}
        </Link>
    );
};