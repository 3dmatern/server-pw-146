"use server";

import type { ResultSetHeader, RowDataPacket } from "mysql2";

import dbPool from "@/lib/db-pool";
import { User } from "@/models/user-model";

export async function changeGM(prevState: any, formData: FormData) {
    let connection;
    try {
        connection = await dbPool.getConnection();
        console.log("Подключились к БД.");
        
        const type = formData.get("type");
        const ident = formData.get("ident");
        const act = formData.get("act");

        if (!type || !ident || !act) {
            return { error: "Указаны не все параметры." };
        }

        let query = "";
        if (type === "id") {
            query = "SELECT ID FROM users WHERE ID = ?";
        } else {
            query = "SELECT ID FROM users WHERE name = ?";
        }

        const [findUniqueUserRows] = await connection.execute<RowDataPacket[] & User[]>(query, [ident]);
        console.log("31", findUniqueUserRows);
        if (findUniqueUserRows.length === 0) {
            return { error: "Такого аккаунта не существует." };
        }
        const userId = findUniqueUserRows[0].ID;

        // Логика обработки изменения прав GM на основе `act`
        let updateQuery = "";
        let updateParams = [];

        switch (act) {
            case "grant":
                updateQuery = "UPDATE users SET isGM = ? WHERE ID = ?";
                updateParams = [true, userId];
                break;

            case "revoke":
                updateQuery = "UPDATE users SET isGM = ? WHERE ID = ?";
                updateParams = [false, userId];
                break;

            case "promote":
                updateQuery = "UPDATE users SET role = ? WHERE ID = ?";
                updateParams = ["admin", userId]; // Или любое другое значение для повышения
                break;

            case "demote":
                updateQuery = "UPDATE users SET role = ? WHERE ID = ?";
                updateParams = ["user", userId]; // Или любое другое значение для понижения
                break;
            default:
                return { error: "Неверное действие." };
        }

        const [changeUserResults] = await connection.execute<ResultSetHeader>(updateQuery, updateParams);
        console.log("66", changeUserResults);
        if (changeUserResults.affectedRows !== 1) {
            return { error: "Ошибка при выполнении действия." };
        }
    } catch (error) {
        console.error("Ошибка при регистрации аккаунта:", error);
        return { error: "Что-то пошло не так! Попробуйте позже."}
    } finally {
        // Возвращаем соединение в пул
        if (connection) connection.release()
        console.log("Отключились от БД.");
    }
};