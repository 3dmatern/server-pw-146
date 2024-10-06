"use client";

import { ChangeEvent, useState } from "react";
import { useFormState } from "react-dom";

import { changeGM } from "@/actions/iweb/accounts/change-gm";

import { UiLabel } from "@/components/ui/form/ui-label";
import { UiSelect } from "@/components/ui/form/ui-select";
import { UiInput } from "@/components/ui/form/ui-input";
import { UiButton } from "@/components/ui/form/ui-button";

import { ErrorMessage } from "@/components/ui/error-message";
import { SuccessMessage } from "@/components/ui/success-message";

import { IwebAccountsContainerField } from "@/components/iweb/accounts/iweb-accounts-container-field";

const GM_TYPES = [
  { value: "id", name: "ID" },
  { value: "login", name: "Login" },
];
const ACTIONS = [
  { value: "add", name: "Дать GM" },
  { value: "delete", name: "Убрать GM" },
];

const initialStateErrors = {
  error: "",
  success: undefined
};
const initialStateForm = {
  type: "id",
  ident: "",
  truename: "",
  act: "add"
};

export function IwebAccountsGMForm() {
  const [state, formAction] = useFormState(changeGM, initialStateErrors);
  const [formState, setFormState] = useState(initialStateForm);

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  };

  return (
    <form className="mt-4 flex flex-col gap-2 text-sm">
      <IwebAccountsContainerField>
        <UiLabel htmlFor="type" className="w-1/2">
          Тип:
        </UiLabel>

        <UiSelect
          id="type"
          className="w-1/2"
          name="type"
          options={GM_TYPES}
          onChange={handleChange}
        />
      </IwebAccountsContainerField>

      <IwebAccountsContainerField>
        <UiLabel htmlFor="ident" className="w-1/2">
          {formState.type === "id" ? "Аккаунт (ID):" : "Логин:"}
        </UiLabel>

        <UiInput
          id="ident"
          className="w-1/2 p-1 px-1.5 text-center"
          onChange={handleChange}
        />
      </IwebAccountsContainerField>

      <IwebAccountsContainerField>
        <UiLabel htmlFor="truename" className="w-1/2">
          Имя персонажа
        </UiLabel>

        <UiInput
          id="truename"
          className="w-1/2 p-1 px-1.5 text-center"
          onChange={handleChange}
        />
      </IwebAccountsContainerField>

      <IwebAccountsContainerField>
        <UiLabel htmlFor="act" className="w-1/2">
          Действие:
        </UiLabel>

        <UiSelect
          id="act"
          className="w-1/2"
          name="act"
          options={ACTIONS}
          onChange={handleChange}
        />
      </IwebAccountsContainerField>

      <ErrorMessage message={state?.error} />
      <SuccessMessage message={state?.success} />

      <UiButton
        className="w-fit mx-auto mt-1 py-1 px-4"
        formAction={formAction}
      >
        Принять
      </UiButton>
    </form>
  )
};