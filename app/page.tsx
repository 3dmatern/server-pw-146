"use client";

import { FormEvent, useState } from "react";

import { UiLabel } from "@/components/ui/form/UiLabel";
import { UiInput } from "@/components/ui/form/UiInput";
import { UiButton } from "@/components/ui/form/UiButton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

import { RegisterModel } from "@/models/register-model";
import { signUp } from "@/actions/auth";

export default function Home() {
  const [formState, setFormState] = useState<RegisterModel>({
    login: "",
    email: "",
    passwd: "",
    repasswd: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signUp(formState);
    console.log("Зарегистрирован", result);
  };
  return (
    <main className="py-5 flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <form
        className="
          max-w-96 w-full mx-auto flex flex-col items-center gap-2 shadow-sm
        "
        onSubmit={handleSubmit}
      >
        <h2 className="mb-5 text-4xl font-bold">Регистрация</h2>

        <UiLabel label="Логин">
          <UiInput type="text" name="login" />
        </UiLabel>

        <UiLabel label="Email">
          <UiInput type="email" name="email" />
        </UiLabel>

        <UiLabel label="Пароль">
          <UiInput type="password" name="passwd" />
        </UiLabel>

        <UiLabel label="Повторите пароль">
          <UiInput type="password" name="repasswd" />
        </UiLabel>

        <ErrorMessage className="my-3"  />

        <UiButton type="submit">
          Регистрация
        </UiButton>
      </form>
    </main>
  );
}
