"use client";

import { useFormState } from "react-dom";

import { UiLabel } from "@/components/ui/form/UiLabel";
import { UiInput } from "@/components/ui/form/UiInput";
import { UiButton } from "@/components/ui/form/UiButton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { SuccessMessage } from "@/components/ui/SuccessMessage";

import { signUp } from "@/actions/auth/register";

// import { RegisterModel } from "@/models/register-model";

const initialState = {
  error: "",
  success: undefined
}

export default function Home() {
  const [state, formAction] = useFormState(signUp, initialState);

  return (
    <main className="py-5 flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <form
        className="
          max-w-96 w-full mx-auto flex flex-col items-center gap-2 shadow-sm
        "
      >
        <h2 className="mb-5 text-4xl font-bold">Регистрация</h2>

        <UiLabel label="Логин">
          <UiInput
            type="text"
            name="name"
          />
        </UiLabel>

        <UiLabel label="Email">
          <UiInput
            type="email"
            name="email"
          />
        </UiLabel>

        <UiLabel label="Пароль">
          <UiInput
            type="password"
            name="passwd"
          />
        </UiLabel>

        <UiLabel label="Повторите пароль">
          <UiInput
            type="password"
            name="repasswd"
          />
        </UiLabel>

        <ErrorMessage className="my-3" message={state.error}  />
        <SuccessMessage className="my-3" message={state.success}  />

        <UiButton formAction={formAction}>
          Регистрация
        </UiButton>
      </form>
    </main>
  );
}
