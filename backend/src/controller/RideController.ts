import { Response, Request } from "express";
import RideServices from "../services/rideServices";
import RideDTO from "../dto/RideDTO";
import DriverServices from "../services/driverServices";

export default class RideController {
    rideServices: RideServices;
    driverServices: DriverServices;
    constructor() {
        this.rideServices = new RideServices();
        this.getRidesFiltered = this.getRidesFiltered.bind(this);
        this.estimateRide = this.estimateRide.bind(this);
        this.confirmRide = this.confirmRide.bind(this);
        this.driverServices = new DriverServices();
    }

    async getRidesFiltered(req: Request, res: Response, next: any) {
        const customer_id = req.params.customer_id;

        const driver_id = req.query.driver_id ? Number(req.query.driver_id) : null;

        const rides = await this.rideServices.findRidesFiltered(customer_id, driver_id);

        if (rides.length > 0 && 'status' in rides[0]) {
            res.status(rides[0].status)
                .send({ error_code: rides[0].error_code, error_description: rides[0].error_description });
        } else {
            res.status(200).send({
                "customer_id": customer_id,
                "rides": rides
            });
        }
    }

    async estimateRide(req: Request, res: Response) {
        const { customer_id, destination, origin } = req.body

        const response = await this.rideServices.estimateRide(customer_id, destination, origin);

        res.status(200);

        res.send(response);
    }

    async confirmRide(req: any, res: any) {
        const { customer_id, destination, origin, distance, duration, value, driver } = req.body
        console.log(driver)
        const ride: RideDTO = {
            customer_id: customer_id,
            driver_id: driver.id,
            origin: origin,
            destination: destination,
            distance: distance,
            duration: duration,
            value: value,
        };

        const response = await this.rideServices.confirmRide(ride);

        if (response !== undefined) {
            res.status(response.status).send({ error_code: response.error_code, error_description: response.error_description });
        }

        res.status(200).send(response);
    }
}