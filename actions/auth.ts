"use server";

import CryptoJS from "crypto-js";

import { RegisterModel } from "@/models/register-model";
import prisma from "@/lib/prisma";

export async function signUp(payload: RegisterModel) {
    const { name, email, passwd, repasswd } = payload;

    if (!name.trim() || !email.trim() || !passwd.trim() || !repasswd.trim()) {
        return { error: "Заполните все поля!" };
    }

    if (RegExp(/^0-9a-zA-Z_-/).test(name)) {
        return { error: "Не верный формат логина" };
    } else if (RegExp(/^0-9a-zA-Z_-/).test(passwd)) {
        return { error: "Не верный формат пароля" };
    } else if (passwd !== repasswd) {
        return { error: "Пароди не совпадают" };
    } else if (RegExp(/^[a-z][0-9_]*(\.[a-z0-9_-]+)*@([0-9a-z]*\.)+([a-z]{2,4})$/).test(email)) {
        return { error: "Введите корректный email" };
    } else if (name.length < 4 || name.length > 10) {
        return { error: "Логин должен содержать не менее 4 и не более 10 символов."}
    } else {
        const isUser = await prisma.users.findFirst({
            where: {
                OR: [
                    {
                        name: { contains: name }
                    },
                    {
                        email: { contains: email }
                    }
                ]
            }
        });
        if (isUser) {
            return { error: "Такой логин или еmail уже существуют" };
        }
    } 

    // Вычисляем MD5 хэш пароля
    const md5HashPassword = CryptoJS.MD5(passwd).toString();
    // Кодируем полученный MD5 хэш в формат Base64
    const base64EncodedPassword = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(md5HashPassword));
    
    try {
        const newUser = await prisma.users.create({
            data: {
                name,
                email,
                passwd: base64EncodedPassword,
                passwd2: base64EncodedPassword,
            }
        });
    
        return {
            success: "Регистрация прошла успешно!",
            user: newUser
        };
    } catch (error) {
        console.error("Error auth register user", error);
        return { error: "Ошибка регистрации аккаунта!"}
    }
};