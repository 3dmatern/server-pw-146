import { Metadata } from "next";

import { IwebNav } from "@/components/iweb/iweb-nav";

export const metadata: Metadata = {
    title: "IWEB | Perfect World 1.4.6",
    description: "Управление сервером Perfect World 1.4.6",
};

export default function IwebLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="pt-5 px-4 flex flex-col items-center gap-5 md:px-0">
            <IwebNav />

            <main className="container mx-auto py-5">
                {children}
            </main>
        </div>
    );
};