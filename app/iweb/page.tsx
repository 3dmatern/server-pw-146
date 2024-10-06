import { accountsList } from "@/actions/iweb/accounts/accounts-list";

import { IwebAccountsCard } from "@/components/iweb/accounts/iweb-accounts-card";
import { IwebAccountsCubiForm } from "@/components/iweb/accounts/iweb-accounts-cubi-form";
import { IwebAccountsGMForm } from "@/components/iweb/accounts/iweb-accounts-gm-form";
import { IwebAccountsList } from "@/components/iweb/accounts/iweb-accounts-list";

import { ErrorMessage } from "@/components/ui/error-message";

export default async function IwebHome() {
  const accountsData = await accountsList();

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
        className="sm:w-72"
        title="Список аккаунтов"
      >
        <ErrorMessage className="mt-4" message={accountsData.error} />
        {accountsData.success && <IwebAccountsList data={accountsData.success} />}
      </IwebAccountsCard>
    </div>
  );
};