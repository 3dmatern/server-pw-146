"use client";


import { useRouter } from "next/navigation";
import { UiButton } from "./ui/form/ui-button";
import { NavLink } from "./ui/nav-link";

export function Navbar() {
  const router = useRouter();

  const toRegisterPage = () => {
    router.push("/auth");
  };

  return (
    <nav className="container px-4 flex items-center justify-between gap-4">
      <NavLink
        className="uppercase"
        href="/"
      >
        PW 1.4.6
      </NavLink>

      <div className="flex items-center justify-center gap-4">
        <NavLink href="/iweb">
          IWEB
        </NavLink>
      </div>

      <UiButton
        className="w-fit py-2 px-3 text-white"
        type="button"
        onClick={toRegisterPage}
      >
        Регистрация
      </UiButton>
    </nav>
  );
};