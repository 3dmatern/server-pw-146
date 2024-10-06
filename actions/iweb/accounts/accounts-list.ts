"use server";

import dbPool from "@/lib/db-pool";
import type { AccountsListDetailModel, AccountsListModel } from "@/models/accounts-list-models";

export async function accountsList() {
  let connection;

  try {
    connection = await dbPool.getConnection();
    // @ts-ignore
    const [authGMRows] = await connection.execute<{ userid: number }[]>("SELECT DISTINCT userid FROM auth");
    console.log("11", authGMRows);
    
    // @ts-ignore
    const [accountsRows] = await connection.execute<AccountsListModel[]>(
      "SELECT ID, name, creatime FROM users"
    );
    console.log("22", accountsRows);
    
    const accounts = [] as AccountsListDetailModel[];
    accountsRows.forEach(account => {
      if (authGMRows.some(gm => gm.userid === account.ID)) {
        accounts.push({ ...account, gm: true });
      } else {
        accounts.push({ ...account, gm: false });
      }
    });
    console.log(accounts);

    return { success: accounts };
  } catch (error) {
    console.error("Ошибка получения списка аккаунтов:", error);
    return { error: "Подключиться к базе данных MySQL не удалось." };
  } finally {
    if (connection) connection.release();
  }
};