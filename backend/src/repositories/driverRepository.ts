import client from '../db/db';
import Driver from '../models/Driver';

export default class DriverRepository {
    async findDriverById(id: number): Promise<Driver> {
        try {
            const driver = await client.query(
                'SELECT * FROM "Drivers" WHERE id = $1', [id]);

            return driver.rows[0];
        }
        catch (error) {
            console.log(error);
            throw new Error(`Driver id does not exist`);
        }
    }

    async findAllDrivers(minimumKm: number): Promise<Driver[]> {
        try {
            const drivers = await client.query(
                'SELECT * FROM "Drivers" WHERE minimum_km <= $1 ORDER BY tax ASC', [minimumKm]);

            return drivers.rows;
        }

        catch (error) {
            console.log(error);
            throw new Error(`Error getting drivers`);
        }
    }
}