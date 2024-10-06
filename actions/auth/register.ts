"use server";

import CryptoJS from "crypto-js";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";

import dbPool from "@/lib/db-pool";
import type { DBUserModel } from '@/models/db-user-model';

export async function signUp(prevState: any, formData: FormData) {
  let connection;
  try {
    connection = await dbPool.getConnection();

    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const passwd = formData.get("passwd")?.toString().trim();
    const repasswd = formData.get("repasswd")?.toString().trim();

    // Валидация данных
    if (!name || !email || !passwd || !repasswd) {
      return { error: "Заполните все поля!" };
    }

    if (RegExp(/^0-9a-zA-Z_-/).test(name.toString())) {
      return { error: "Не верный формат логина" };
    } else if (RegExp(/^0-9a-zA-Z_-/).test(passwd.toString())) {
      return { error: "Не верный формат пароля" };
    } else if (passwd !== repasswd) {
      return { error: "Пароди не совпадают" };
    } else if (RegExp(/^[a-z][0-9_]*(\.[a-z0-9_-]+)*@([0-9a-z]*\.)+([a-z]{2,4})$/).test(email.toString())) {
      return { error: "Введите корректный email" };
    } else if (name?.toString().length < 4 || name?.toString().length > 10) {
      return { error: "Логин должен содержать не менее 4 и не более 10 символов."}
    }
    
    // Проверка существования аккаунта
    const useUsersQuery = "SELECT * FROM users WHERE name = ? OR email = ? LIMIT 1";
    const [findUniqueUserRows] = await connection.execute<RowDataPacket[] & DBUserModel[]>(useUsersQuery, [name, email]);
    if (findUniqueUserRows.length > 0) {
      return { error: "Такой логин или еmail уже существуют" };
    }

    // Вычисляем MD5 хэш пароля и кодируем в Base64
    const md5HashPassword = CryptoJS.MD5(passwd.toString()).toString();
    const base64EncodedPassword = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(md5HashPassword));

    const GOLD = "1000000000"; // Количество золота

    // Добавляем аккаунт
    const useAddUserQuery = "CALL adduser(?, ?, '0', '0', '0', '0', ?, '0', '0', '0', '0', '0', '0', '0', '', '', ?)";
    const [addUserResults] = await connection.execute<ResultSetHeader>(
      useAddUserQuery,
      [name, base64EncodedPassword, email, base64EncodedPassword]
    );
    if (addUserResults.affectedRows !== 1) {
      return { error: "Ошибка регистрации аккаунта!" };
    }

    // Получаем ID аккаунта
    const [userIdResults] = await connection.execute<RowDataPacket[] & DBUserModel[]>(
      "SELECT * FROM users WHERE name = ?",
      [name]
    );
    const { ID } = userIdResults[0];

    // Начисляем голду
    await connection.execute(
      "CALL usecash(?, 1, 0, 1, 0, ?, 1, @error)",
      [ID, GOLD]
    );
    // Возвращаем успех
    return {
      success: `Аккаунт ${name} успешно зарегистрирован. Ваш ID: ${ID}. ${GOLD} золота начислено.`
    };
  } catch (error) {
    console.error("Ошибка при регистрации аккаунта:", error);
    return { error: "Что-то пошло не так! Попробуйте позже."}
  } finally {
    // Возвращаем соединение в пул
    if (connection) connection.release()
  }
};