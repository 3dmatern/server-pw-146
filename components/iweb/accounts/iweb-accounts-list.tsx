import { cn } from "@/lib/cn";
import { formatDateAccountsList } from "@/utils/format-date";

import type { AccountsListDetailModel } from "@/models/accounts-list-models";

type Props = {
  data: AccountsListDetailModel[]
}

export function IwebAccountsList({ data }: Props) {
  return(
    <div className="mt-4 flex flex-col gap-2 text-sm">
      <div
        className="
          py-2 flex items-center justify-between gap-1 text-center
          text-slate-600 bg-slate-300 rounded-ss-lg rounded-se-lg
        "
      >
        <span className="w-1/4 px-2">ID</span>
        <span className="w-1/4 px-2">Login</span>
        <span className="w-1/2 px-2">Дата создания</span>
      </div>

      <div className="w-full flex flex-col items-start gap-1">
        {data.map(d => (
          <div
            key={d.ID}
            className="
              w-full flex items-center justify-between gap-1 text-center
              border-b border-slate-300
            "
          >
            <p className="w-1/4 px-2">
              {d.ID}
            </p>
            <p
              className={cn(
                "w-1/4 px-2",
                d.gm ? "text-red-600" : ""
              )}
            >
              {d.name}
            </p>
            <p className="w-1/2 px-2">
              {formatDateAccountsList(d.creatime)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};