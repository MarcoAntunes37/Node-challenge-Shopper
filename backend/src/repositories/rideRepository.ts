import client from '../db/db';
import RideDTO from '../dto/RideDTO';

export default class RideRepository {
    async confirmRide(ride: RideDTO) {
        let query = `INSERT INTO "Rides" (driver_id, customer_id, origin, destination, distance, duration, value, "createdAt", "updatedAt")
            VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`;

        try {
            await client.query(query, [ride.driver_id, ride.customer_id, ride.origin, ride.destination, ride.distance, ride.duration, ride.value]);
        }
        catch (error) {
            console.log(error);
            throw new Error(`Error confirming customer ride`);
        }
    }

    async findRideFilteredByCustomerId(customer_id: string) {
        const query = 'SELECT * FROM "Rides" WHERE customer_id = $1 ORDER BY "createdAt" DESC';
        try {
            const rides = await client.query(query, [customer_id]);
            return rides.rows;
        }
        catch (error) {
            console.log(error);
            throw new Error(`Error getting customer rides`);
        }
    }

    async findRideFilteredByCustomerIdAndDriverId(customer_id: string, driver_id: number) {
        const query = 'SELECT * FROM "Rides" WHERE customer_id = $1 AND driver_id = $2 ORDER BY "createdAt" DESC';
        try {
            const rides = await client.query(query, [customer_id, driver_id]);
            return rides.rows;
        }
        catch (error) {
            console.log(error);
            throw new Error(`Error getting customer rides`);
        }
    }
}