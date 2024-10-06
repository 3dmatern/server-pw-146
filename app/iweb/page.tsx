import { IwebAccountsCard } from "@/components/iweb/accounts/iweb-accounts-card";
import { IwebAccountsCubiForm } from "@/components/iweb/accounts/iweb-accounts-cubi-form";
import { IwebAccountsGMForm } from "@/components/iweb/accounts/iweb-accounts-gm-form";

export default function IwebHome() {
  return (
    <div className="flex flex-col items-start justify-center gap-3 md:flex-row">
      <IwebAccountsCard
        title="Игровой GM"
      >
        <IwebAccountsGMForm />
      </IwebAccountsCard>

      <IwebAccountsCard
        title="Начислить золото"
      >
        <IwebAccountsCubiForm />
      </IwebAccountsCard>

      <IwebAccountsCard
        title="Список аккаунтов"
      >
        <form></form>
      </IwebAccountsCard>
    </div>
  );
};