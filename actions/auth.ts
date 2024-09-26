import CryptoJS from "crypto-js";

import { RegisterModel } from "@/models/register-model";
import prisma from "@/lib/prisma";

export async function signUp(payload: RegisterModel) {
    // Вычисляем MD5 хэш пароля
    const md5HashPassword = CryptoJS.MD5(payload.passwd).toString();
    // Кодируем полученный MD5 хэш в формат Base64
    const base64EncodedPassword = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(md5HashPassword));
    
    const newUser = await prisma.users.create({
        data: {
            ...payload,
            passwd: base64EncodedPassword
        }
    });

    return newUser;
};