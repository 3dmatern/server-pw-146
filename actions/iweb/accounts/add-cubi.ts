"use server";

import { ResultSetHeader, RowDataPacket } from "mysql2";

import dbPool from "@/lib/db-pool";
import { DBUserModel } from "@/models/db-user-model";

export async function addCubi(prevState: any, formData: FormData) {
  let connection;

  try {
    const type = formData.get("type")?.toString().trim();
    const ident = formData.get("ident")?.toString().trim();
    const amount = formData.get("amount")?.toString().trim();

    if (!type || !ident || !amount) {
      return { error: "Указаны не все параметры." };
    }

    if (+amount < 1 || +amount > 999999999) {
      return { error: "Неверное количестов золота. Диапазон: от 1 до 999999999)." };
    }

    connection = await dbPool.getConnection();
    
    let useUniqueUserQuery = "";
    if (type === "id") {
      useUniqueUserQuery = "SELECT ID FROM users WHERE ID = ?";
    } else {
      useUniqueUserQuery = "SELECT ID FROM users WHERE name = ?";
    }
    const [findUniqueUserRows] = await connection.execute<RowDataPacket[] & DBUserModel[]>(
      useUniqueUserQuery,
      [ident]
    );
    if (findUniqueUserRows.length <= 0) {
      return { error: "Такого аккаунта не существует." };
    }
    
    const GOLD = 100 * +amount;
    const userId = findUniqueUserRows[0].ID;
    const useCashCall = "CALL usecash (?, 1, 0, 1, 0, ?, 1, @error)";
    const [useCashResults] = await connection.execute<ResultSetHeader>(
      useCashCall,
      [userId, GOLD]
    );
    if (useCashResults.serverStatus === 2) {
      return {
        success: `
          ${amount}.00 золота начислено. Транзакция может занять до 5 минут,
          необходимые для получения золота.
        `
      };
    }
  } catch (error) {
    console.error("Ошибка при выдаче золота:", error);
    return { error: "Что-то пошло не так. Попробуйте позже." };
  } finally {
    if (connection) connection.release();
  }
}