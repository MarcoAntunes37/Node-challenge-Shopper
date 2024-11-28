import callGeoCodificationApi from "../http/googleGeoCodificationApi";
import callRoutesApi from "../http/googleRoutesApi";
import RideRepository from "../repositories/rideRepository";
import DriverRepository from "../repositories/driverRepository";
import GeoCodeApiResponse from "../types/responses/GoogleApi/GeoCodeApiResponse";
import RoutesApiResponse from "../types/responses/GoogleApi/RoutesApiResponse";
import EstimateRideOption from "../types/EstimateRideOption";
import RideDTO from "../dto/RideDTO";
import Ride from "../models/Ride";

export default class RideServices {
    rideRepository: RideRepository = new RideRepository()
    driverRepository: DriverRepository = new DriverRepository()

    async findRidesFiltered(customer_id: string, driver_id: number | null) {
        try {
            if (driver_id !== null) {
                const driver = await this.driverRepository.findDriverById(driver_id);

                if (!driver) {
                    return [{
                        status: 400,
                        error_code: "INVALID_DATA",
                        error_description: "Motorista inválido."
                    }]
                }

                const rides: Ride[] = await this.rideRepository.findRideFilteredByCustomerIdAndDriverId(customer_id, driver_id);

                if (rides.length === 0) {
                    return [{
                        status: 404,
                        error_code: "NO_RIDES_FOUND",
                        error_description: "Nenhuma corrida encontrada."
                    }]
                }

                return rides;
            }
            else {
                const rides: Ride[] = await this.rideRepository.findRideFilteredByCustomerId(customer_id);

                if (rides.length === 0) {
                    return [{
                        status: 404,
                        error_code: "NO_RIDES_FOUND",
                        error_description: "Nenhuma corrida encontrada."
                    }]
                }

                return rides;
            }
        }
        catch (error) {
            console.log(error);
            return [];
        }
    }

    async estimateRide(customer_id: string, destiny: string, origin: string) {
        if (!customer_id || !destiny || !origin) {
            return {
                status: 400,
                error_code: "INVALID_DATA",
                error_description: "Os dados fornecidos no corpo da requisição são inválidos"
            }
        }

        if (destiny === origin) {
            return {
                status: 400,
                error_code: "INVALID_DATA",
                error_description: "Origem e destino não podem ser iguais"
            }
        }

        const geoCodeApiResponse: GeoCodeApiResponse = await callGeoCodificationApi(origin, destiny);

        const routesApiResponse: RoutesApiResponse = await callRoutesApi(geoCodeApiResponse);

        if (routesApiResponse.routes && routesApiResponse.routes.length > 0) {
            const distance = Math.round(
                parseInt(routesApiResponse.routes[0].distanceMeters.toString(), 10) / 1000);

            const drivers = await this.driverRepository.findAllDrivers(distance);

            var options: EstimateRideOption[] = []

            for (const driver of drivers) {
                var splittedRating = driver.rating.split(/ (.*)/);

                const option: EstimateRideOption = {
                    id: driver.id,
                    name: driver.name,
                    description: driver.description,
                    vehicle: driver.car,
                    review: {
                        rating: parseInt(splittedRating[0]),
                        comment: splittedRating[1]
                    },
                    value: driver.tax
                }

                options.push(option);
            }

            var estimateRideResponse = {
                origin: {
                    latitude: geoCodeApiResponse.origin.lat,
                    longitude: geoCodeApiResponse.origin.lng
                },
                destination: {
                    latitude: geoCodeApiResponse.destination.lat,
                    longitude: geoCodeApiResponse.destination.lng
                },
                distance: distance,
                duration: routesApiResponse.routes[0].duration,
                options: options,
                routesResponse: routesApiResponse
            }

            return estimateRideResponse
        }
        else {
            return {
                status: 400,
                error_code: "INVALID_DATA",
                error_description: "Os dados fornecidos no corpo da requisição são inválidos"
            }
        }
    }

    async confirmRide(ride: RideDTO) {
        const { customer_id, driver_id, origin, destination, distance } = ride

        var driver = await this.driverRepository.findDriverById(driver_id);

        if (!driver) {
            return {
                status: 400,
                error_code: "INVALID_DATA",
                error_description: "Motorista inválido."
            };
        }

        if (!customer_id) {
            return {
                status: 400,
                error_code: "INVALID_DATA",
                error_description: "Os dados fornecidos no corpo da requisição são inválidos"
            }
        }

        if (!origin || !destination) {
            return {
                status: 400,
                error_code: "INVALID_DATA",
                error_description: "Os dados fornecidos no corpo da requisição são inválidos"
            }
        }

        if (origin === destination) {
            return {
                status: 400,
                error_code: "INVALID_DATA",
                error_description: "Origem e destino não podem ter o mesmo valor"
            }
        }

        if (driver.minimum_km > distance) {
            return {
                status: 400,
                error_code: "INVALID_DATA",
                error_description: "Distância menor do que o exigido pelo motorista"
            }
        }

        await this.rideRepository.confirmRide(ride);

        return { success: true };
    }
}