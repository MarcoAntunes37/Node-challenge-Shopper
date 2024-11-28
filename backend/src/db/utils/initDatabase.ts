import client from "../db";
import executeScripts from "./executeSqlScripts";
export default async function initDatabase() {
    await client.connect();
    await executeScripts('/app/src/db/scripts/create_script.sql', '/app/src/db/scripts/insert_script.sql', client);
}