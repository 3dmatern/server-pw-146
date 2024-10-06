"use client";

import { useEffect, useState } from "react";

import { accountsList } from "@/actions/iweb/accounts/accounts-list";
import type { AccountsListDetailModel } from "@/models/accounts-list-models";

import { IwebAccountsCard } from "@/components/iweb/accounts/iweb-accounts-card";
import { IwebAccountsCubiForm } from "@/components/iweb/accounts/iweb-accounts-cubi-form";
import { IwebAccountsGMForm } from "@/components/iweb/accounts/iweb-accounts-gm-form";
import { IwebAccountsList } from "@/components/iweb/accounts/iweb-accounts-list";

import { ErrorMessage } from "@/components/ui/error-message";


export default function IwebHome() {
  const [isUpdateGMs, setIsUpdateGMs] = useState(false);
  const [accountsData, setAccountsData] = useState<{
    error?: string;
    success?: AccountsListDetailModel[]
  }>({});

  const getAccountsData = async () => {
    const data = await accountsList();
    setAccountsData(data);
  };

  const handleIsUpdateGMs = () => {
    setIsUpdateGMs(prev => !prev);
  };

  useEffect(() => {
    getAccountsData();
  }, []);

  useEffect(() => {
    if (isUpdateGMs) {
      getAccountsData();
      setIsUpdateGMs(false);
    }
  }, [isUpdateGMs]);

  return (
    <div className="flex flex-col items-start justify-center gap-3 md:flex-row">
      <IwebAccountsCard
        title="Игровой GM"
      >
        <IwebAccountsGMForm onUpdateGMs={handleIsUpdateGMs} />
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