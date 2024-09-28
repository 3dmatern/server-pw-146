"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { UiLabel } from "@/components/ui/form/UiLabel";
import { UiInput } from "@/components/ui/form/UiInput";
import { UiButton } from "@/components/ui/form/UiButton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { SuccessMessage } from "@/components/ui/SuccessMessage";

import { RegisterModel } from "@/models/register-model";

import { signUp } from "@/actions/auth";

export default function Home() {
  const [formState, setFormState] = useState<RegisterModel>({
    name: "",
    email: "",
    passwd: "",
    repasswd: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    setSuccessMsg("");
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      setErrorMsg("");
      setSuccessMsg("");
    const result = await signUp(formState);
    
    if (result.error) {
      setErrorMsg(result.error);
    }

    if (result.success) {
      setFormState({
        name: "",
        email: "",
        passwd: "",
        repasswd: ""
      });
      setSuccessMsg(result.success);
    }
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
          <UiInput
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
          />
        </UiLabel>

        <UiLabel label="Email">
          <UiInput
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
        </UiLabel>

        <UiLabel label="Пароль">
          <UiInput
            type="password"
            name="passwd"
            value={formState.passwd}
            onChange={handleChange}
          />
        </UiLabel>

        <UiLabel label="Повторите пароль">
          <UiInput
            type="password"
            name="repasswd"
            value={formState.repasswd}
            onChange={handleChange}
          />
        </UiLabel>

        <ErrorMessage className="my-3" message={errorMsg}  />
        <SuccessMessage className="my-3" message={successMsg}  />

        <UiButton type="submit">
          Регистрация
        </UiButton>
      </form>
    </main>
  );
}
