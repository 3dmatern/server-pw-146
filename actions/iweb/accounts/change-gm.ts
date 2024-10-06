"use server";

import type { ResultSetHeader, RowDataPacket } from "mysql2";

import dbPool from "@/lib/db-pool";
import { DBUserModel } from "@/models/db-user-model";
import { DBAuthModel } from "@/models/db-auth-model";

export async function changeGM(prevState: any, formData: FormData) {
  let connection;
  try {
    connection = await dbPool.getConnection();
    console.log("Подключились к БД.");
    
    const type = formData.get("type")?.toString().trim();
    const ident = formData.get("ident")?.toString().trim();
    const truename = formData.get("truename")?.toString().trim();
    const act = formData.get("act")?.toString().trim();
    console.log({ type, ident, truename, act });

    if (!type || !ident || !act) {
      return { error: "Указаны не все параметры." };
    }

    let query = "";
    if (type === "id") {
      query = "SELECT ID FROM users WHERE ID = ?";
    } else {
      query = "SELECT ID FROM users WHERE name = ?";
    }

    const [findUniqueUserRows] = await connection.execute<RowDataPacket[] & DBUserModel[]>(query, [ident]);
    console.log("32", findUniqueUserRows);
    if (findUniqueUserRows.length <= 0) {
      return { error: "Такого аккаунта не существует." };
    }

    // Поиск уже существующих прав GM
    const userId = findUniqueUserRows[0].ID;
    console.log("39", userId);
    const useGMQuery = `SELECT userid FROM auth WHERE userid = ?`;
    const [authGMRows] = await connection.execute<RowDataPacket[] & DBAuthModel[]>(useGMQuery, [userId]);
    console.log("41", authGMRows);
    if (authGMRows.length > 0) {
      if (act === "delete") {
      // Удаляем права GM
        const useDeleteGmQuery = "DELETE FROM auth WHERE userid = ?";
        const [deleteGMResults] = await connection.execute<ResultSetHeader>(useDeleteGmQuery, [userId]);
        console.log("46", deleteGMResults);
        if (deleteGMResults.affectedRows > 0) {
          return { success: "Права GM сняты с аккаунта." };
        }
        return { error: "У аккаунта нет доступа к правам GM." };
      }

      // Если права уже назначены
      if (act === "add") {
        return { error: "Аккаунт уже имеет права GM." };
      }
    } else {
      // Если права уже были удалены
      if (act === "delete") {
        return { error: "У аккаунта нет доступа к правам GM." };
      }

      // Выдаём права GM
      if (act === "add") {
        const useAddGMQuery = "CALL addGM(?, '1')";
        const [addGMResults] = await connection.execute<ResultSetHeader>(useAddGMQuery, [userId]);
        console.log("63", addGMResults);
        if (addGMResults.serverStatus === 2) {
          return { success: "Права GM выданы аккаунту." };
        }
      }
    }
  } catch (error) {
    console.error("Ошибка при выдаче прав GM:", error);
    return { error: "Что-то пошло не так! Попробуйте позже."}
  } finally {
    // Возвращаем соединение в пул
    if (connection) connection.release()
    console.log("Отключились от БД.");
  }
};