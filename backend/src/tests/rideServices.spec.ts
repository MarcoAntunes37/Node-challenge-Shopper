import RideDTO from '../dto/RideDTO';
import RideServices from '../services/rideServices';
import EstimateRideResponse from '../types/responses/EstimateRideResponse';
import RoutesApiResponse from '../types/responses/GoogleApi/RoutesApiResponse';

jest.mock('../services/rideServices')

const mockedRideServices = RideServices as jest.MockedClass<typeof RideServices>;

describe('RideServices findRidesFiltered', () => {
    it('findRidesFiltered should return a list of rides when driver is not null', () => {
        const customer_id = '1';
        const driver_id = 1;
        const rides = [{ id: 1, customer_id: '1', driver_id: 1, origin: 'A', destination: 'B', distance: 1, duration: '1', value: 1 }]

        mockedRideServices.prototype.findRidesFiltered.mockResolvedValueOnce(rides as unknown as []);

        const response = mockedRideServices.prototype.findRidesFiltered(customer_id, driver_id);

        expect(mockedRideServices.prototype.findRidesFiltered).toHaveBeenCalledWith(customer_id, driver_id);
        expect(response).resolves.toEqual(rides);
    })

    it('findRidesFiltered should return an error driver not found when driver is not null but does not exist', () => {
        const customer_id = '1';
        const driver_id = 0;
        const errorObject = {
            status: 400,
            error_code: "INVALID_DATA",
            error_description: "Motorista inválido."
        }

        mockedRideServices.prototype.findRidesFiltered.mockResolvedValueOnce([errorObject]);

        const response = mockedRideServices.prototype.findRidesFiltered(customer_id, driver_id);

        expect(mockedRideServices.prototype.findRidesFiltered).toHaveBeenCalledWith(customer_id, driver_id);
        expect(response).resolves.toEqual([errorObject]);
    })

    it('findRidesFiltered should return an error no rides found when driver is null', () => {
        const customer_id = '1';
        const driver_id = null;
        const errorObject = {
            status: 404,
            error_code: "NO_RIDES_FOUND",
            error_description: "Nenhuma corrida encontrada."
        }

        mockedRideServices.prototype.findRidesFiltered.mockResolvedValueOnce([errorObject]);

        const response = mockedRideServices.prototype.findRidesFiltered(customer_id, driver_id);

        expect(mockedRideServices.prototype.findRidesFiltered).toHaveBeenCalledWith(customer_id, driver_id);
        expect(response).resolves.toEqual([errorObject]);
    })
});

describe('RideServices estimateRide', () => {
    it('estimateRide should return a object estimateRideResponse', () => {
        const customer_id = '1';
        const destination = 'A';
        const origin = 'B';

        const routeResponse: RoutesApiResponse = {
            routes: [
                {
                    duration: '120',
                    distanceMeters: 1300,
                    polyline: {
                        encodedPolyline: 'encodedPolyline'
                    }
                }
            ]
        }

        const estimateRideResponse: EstimateRideResponse = {
            origin: { latitude: 1, longitude: 1 },
            destination: { latitude: 1, longitude: 1 },
            distance: 1,
            duration: '1',
            options: [
                {
                    id: 1,
                    name: '1',
                    review: {
                        rating: 1,
                        comment: '1'
                    },
                    description: '1',
                    vehicle: '1',
                    value: 1
                },
            ],
            routesResponse: routeResponse,
        }
        mockedRideServices.prototype.estimateRide.mockResolvedValueOnce(estimateRideResponse);
        const response = mockedRideServices.prototype.estimateRide(customer_id, destination, origin);

        expect(mockedRideServices.prototype.estimateRide).toHaveBeenCalledWith(customer_id, destination, origin);
        expect(response).resolves.toEqual(estimateRideResponse);
    })

    it('estimateRide should return an error invalid data when customer_id, destination or origin is empty', () => {
        const customer_id = '';
        const destination = '';
        const origin = '';

        const errorObject = {
            status: 400,
            error_code: "INVALID_DATA",
            error_description: "Os dados fornecidos no corpo da requisição são inválidos"
        }

        mockedRideServices.prototype.estimateRide.mockResolvedValueOnce(errorObject);

        const response = mockedRideServices.prototype.estimateRide(customer_id, destination, origin);

        expect(mockedRideServices.prototype.estimateRide).toHaveBeenCalledWith(customer_id, destination, origin);
        expect(response).resolves.toEqual(errorObject);
    })

    it('estimateRide should return an error invalid data when destination or origin has the same value', () => {
        const customer_id = '1';
        const destination = 'A';
        const origin = 'A';

        const errorObject = {
            status: 400,
            error_code: "INVALID_DATA",
            error_description: "Origem e destino não podem ser iguais"
        }

        mockedRideServices.prototype.estimateRide.mockResolvedValueOnce(errorObject);

        const response = mockedRideServices.prototype.estimateRide(customer_id, destination, origin);

        expect(mockedRideServices.prototype.estimateRide).toHaveBeenCalledWith(customer_id, destination, origin);
        expect(response).resolves.toEqual(errorObject);
    })
});

describe('RideServices confirmRide', () => {
    it('confirmRide should return a object with success:true', () => {
        const ride: RideDTO = {
            customer_id: '1',
            driver_id: 1,
            origin: 'A',
            destination: 'B',
            distance: 1,
            duration: '1',
            value: 1
        };

        const confirmRideResponse = { success: true };

        mockedRideServices.prototype.confirmRide.mockResolvedValueOnce({ success: true });

        const response = mockedRideServices.prototype.confirmRide(ride);

        expect(mockedRideServices.prototype.confirmRide).toHaveBeenCalledWith(ride);
        expect(response).resolves.toEqual(confirmRideResponse);
    })

    it('confirmRide should return an error invalid data when driver_id is invalid', () => {
        const errorObject = {
            status: 400,
            error_code: "INVALID_DATA",
            error_description: "Motorista inválido."
        };

        const ride: RideDTO = {
            customer_id: '1',
            driver_id: 0,
            origin: 'A',
            destination: 'B',
            distance: 1,
            duration: '1',
            value: 1
        };

        mockedRideServices.prototype.confirmRide.mockResolvedValueOnce(errorObject);

        const response = mockedRideServices.prototype.confirmRide(ride);

        expect(mockedRideServices.prototype.confirmRide).toHaveBeenCalledWith(ride);
        expect(response).resolves.toEqual(errorObject);
    })

    it('confirmRide should return an error invalid data when customer_id, origin or destination is invalid', () => {
        const errorObject = {
            status: 400,
            error_code: "INVALID_DATA",
            error_description: "Os dados fornecidos no corpo da requisição são inválidos"
        };

        const ride: RideDTO = {
            customer_id: '',
            driver_id: 1,
            origin: '%',
            destination: '*',
            distance: 1,
            duration: '1',
            value: 1
        };

        mockedRideServices.prototype.confirmRide.mockResolvedValueOnce(errorObject);

        const response = mockedRideServices.prototype.confirmRide(ride);

        expect(mockedRideServices.prototype.confirmRide).toHaveBeenCalledWith(ride);
        expect(response).resolves.toEqual(errorObject);
    })

    it('confirmRide should return an error invalid data when destination or origin has the same value', () => {
        const errorObject = {
            status: 400,
            error_code: "INVALID_DATA",
            error_description: "Origem e destino não podem ter o mesmo valor"
        };

        const ride: RideDTO = {
            customer_id: '1',
            driver_id: 1,
            origin: 'A',
            destination: 'A',
            distance: 1,
            duration: '1',
            value: 1
        };

        mockedRideServices.prototype.confirmRide.mockResolvedValueOnce(errorObject);

        const response = mockedRideServices.prototype.confirmRide(ride);

        expect(mockedRideServices.prototype.confirmRide).toHaveBeenCalledWith(ride);
        expect(response).resolves.toEqual(errorObject);
    })

    it('confirmRide should return an error invalid data when distance is invalid', () => {
        const errorObject = {
            status: 400,
            error_code: "INVALID_DATA",
            error_description: "Distância menor do que o exigido pelo motorista"
        };

        const ride: RideDTO = {
            customer_id: '1',
            driver_id: 1,
            origin: 'A',
            destination: 'B',
            distance: 0,
            duration: '1',
            value: 1
        };

        mockedRideServices.prototype.confirmRide.mockResolvedValueOnce(errorObject);

        const response = mockedRideServices.prototype.confirmRide(ride);

        expect(mockedRideServices.prototype.confirmRide).toHaveBeenCalledWith(ride);
        expect(response).resolves.toEqual(errorObject);
    })
});