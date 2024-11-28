import { Client } from 'pg';

const client = new Client({
    user: 'postgres',
    host: 'database',
    database: 'challenge',
    password: 'postgres',
    port: 5432,
});

export default client;