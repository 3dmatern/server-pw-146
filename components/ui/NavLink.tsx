"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

interface NavLinkProps {
    className?: string;
    children: React.ReactNode; // Содержимое ссылки
}

export function NavLink({
    href,
    children,
    className,
    ...rest
}: NavLinkProps & LinkProps) {
    const pathname = usePathname();

    const onIsActive = (path: string): boolean => {
        return pathname === path;
    };

    return (
        <Link
            className={cn(
                `hover:text-teal-600 transition-colors`,
                onIsActive(href.toString()) ? "text-teal-600" : "",
                className || ""
            )}
            href={href}
            {...rest}
        >
            {children}
        </Link>
    );
};