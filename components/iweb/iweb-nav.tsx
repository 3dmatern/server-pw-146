import { NavLink } from "@/components/ui/nav-link";

export function IwebNav() {
  const LINKS = [
    { href: "/iweb", name: "Аккаунты" },
    { href: "/iweb/edit-xml", name: "Редактирование XML" },
    { href: "/iweb/characters", name: "Персонажи" },
    { href: "/iweb/server", name: "Сервер" },
    { href: "/iweb/locations-services", name: "Локации и службы" },
    { href: "/iweb/reboot", name: "Перезагрузка" },
  ];

  return (
    <div
      className="
        container w-full mx-auto px-4 flex flex-wrap justify-center gap-3 md:px-0
      "
    >
      {LINKS.map(link => (
        <NavLink key={link.href} variant="button" href={link.href}>
          {link.name}
        </NavLink>
      ))}
    </div>
  );
};