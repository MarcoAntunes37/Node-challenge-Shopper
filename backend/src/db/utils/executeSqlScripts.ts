import fs from 'fs';
import { Client } from 'pg';
export default async function executeScripts(createScriptPath: string, insertScriptPath: string, client: Client) {
    try {
        const createScript = fs.readFileSync(createScriptPath, 'utf-8');

        const createResult = await client.query(createScript);

        const insertScript = fs.readFileSync(insertScriptPath, 'utf-8');

        const insertResult = await client.query(insertScript);

        return { createResult, insertResult };
    } catch (error) {
        console.log(error);
        throw new Error(`Error executing script:`);
    }
}