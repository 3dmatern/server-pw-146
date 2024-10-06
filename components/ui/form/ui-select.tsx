import { cn } from "@/lib/cn";
import { SelectHTMLAttributes } from "react";

type PropOption = {
  id?: number;
  value: string;
  name: string;
}

type Props = {
  options?: PropOption[];
};

export function UiSelect({
  options,
  className,
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & Props) {
  return (
    <select
      className={cn(
        `
          w-full p-1 text-center text-gray-800 ring-1 ring-inset ring-gray-300
          rounded-md outline-sky-600 cursor-pointer
        `,
        className || ""
      )}
      {...rest}
    >
      {
        options ?
          options.map(o => (
            <option key={o.id || o.value} value={o.value}>
              {o.name}
            </option>
          )) :
          children
      }
    </select>
  );
};