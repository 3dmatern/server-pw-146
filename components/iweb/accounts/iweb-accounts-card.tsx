import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = {
  title: string;
  children: React.ReactNode
};

export function IwebAccountsCard({
  className,
  title,
  children
}: HTMLAttributes<HTMLDivElement> & Props) {
  return (
    <div
      className={cn(
        "w-full p-4 border border-slate-300 rounded-lg shadow sm:w-64 sm:p-2",
        className || ""
      )}
    >
      <h2 className="text-center font-semibold uppercase border-b">
        {title}
      </h2>

      {children}
    </div>
  );
};