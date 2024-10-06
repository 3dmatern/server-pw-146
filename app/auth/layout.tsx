import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Регистрация PW 1.4.6",
  description: "Регистрация на сервере Perfect World 1.4.6",
};

export default function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <main className="py-5 px-4 flex flex-col gap-8 items-center sm:items-start md:px-0">
            {children}
        </main>
    );
};