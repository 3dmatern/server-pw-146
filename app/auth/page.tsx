"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

import { UiLabel } from "@/components/ui/form/ui-label";
import { UiInput } from "@/components/ui/form/ui-input";
import { UiButton } from "@/components/ui/form/ui-button";
import { ErrorMessage } from "@/components/ui/error-message";
import { SuccessMessage } from "@/components/ui/success-message";

import { signUp } from "@/actions/auth/register";


const initialState = {
  error: "",
  success: undefined
}

export default function Home() {
  const [state, formAction] = useFormState(signUp, initialState);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <form
      ref={formRef}
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

      <ErrorMessage className="my-3" message={state?.error}  />
      <SuccessMessage className="my-3" message={state?.success}  />

      <UiButton formAction={formAction}>
        Регистрация
      </UiButton>
    </form>
  );
}
