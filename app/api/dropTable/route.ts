// pages/api/dropTable.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function GET(request: Request) {

    const db = await open({
      filename: './db/items.db',
      driver: sqlite3.Database
    });

    const result = await db.exec('DROP TABLE IF EXISTS items');
    await db.close();


    return new Response(JSON.stringify(result), {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });

}