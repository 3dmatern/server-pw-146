type Props = {
  title: string;
  children: React.ReactNode
};

export function IwebAccountsCard({
  title,
  children
}: Props) {
  return (
    <div className="w-full p-4 border border-slate-300 rounded-lg shadow sm:w-64 sm:p-2">
      <h2 className="text-center font-semibold uppercase border-b">
        {title}
      </h2>

      {children}
    </div>
  );
};