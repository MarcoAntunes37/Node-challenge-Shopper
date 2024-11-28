import DriverServices from '../services/driverServices';

jest.mock('../services/driverServices')

const mockedDriverServices = DriverServices as jest.MockedClass<typeof DriverServices>;

describe('DriverServices', () => {
    it('findAllDrivers method should return a list of drivers containing one row', async () => {
        const minimumKm = 10

        const driverMock = {
            id: 1,
            name: 'name',
            description: 'description',
            car: 'car',
            rating: 'rating',
            tax: 10,
            minimum_km: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        mockedDriverServices.prototype.findAllDrivers.mockResolvedValue([
            driverMock
        ]);

        const drivers = await mockedDriverServices.prototype.findAllDrivers(minimumKm);

        expect(mockedDriverServices.prototype.findAllDrivers).toHaveBeenCalledWith(minimumKm);

        expect(drivers).toEqual([driverMock]);
    });

    it('findAllDrivers method should return a list of driver containing no rows', async () => {
        const minimumKm = 10

        mockedDriverServices.prototype.findAllDrivers.mockResolvedValue([]);

        const drivers = await mockedDriverServices.prototype.findAllDrivers(minimumKm);

        expect(mockedDriverServices.prototype.findAllDrivers).toHaveBeenCalledWith(minimumKm);
        expect(drivers).toEqual([]);
    });

    it('findDriverById method should return a driver', async () => {
        const driver = {
            id: 1,
            name: 'name',
            description: 'description',
            car: 'car',
            rating: 'rating',
            tax: 10,
            minimum_km: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        mockedDriverServices.prototype.findDriverById.mockResolvedValue(driver);

        const foundDriver = await mockedDriverServices.prototype.findDriverById(1);

        expect(mockedDriverServices.prototype.findDriverById).toHaveBeenCalledWith(1);

        expect(foundDriver).toEqual(driver);
    });

    it('validateDriver method should return true', async () => {
        const driver_id = 1

        mockedDriverServices.prototype.validateDriver.mockResolvedValue(true);

        const foundDriver = await mockedDriverServices.prototype.validateDriver(driver_id);

        expect(mockedDriverServices.prototype.validateDriver).toHaveBeenCalledWith(driver_id);

        expect(foundDriver).toEqual(true);
    })

    it('validateDriver method should return false', async () => {
        const driver_id = 0

        mockedDriverServices.prototype.validateDriver.mockResolvedValue(false);

        const foundDriver = await mockedDriverServices.prototype.validateDriver(driver_id);

        expect(mockedDriverServices.prototype.validateDriver).toHaveBeenCalledWith(driver_id);

        expect(foundDriver).toEqual(false);
    })

    it('validateDriverMinimumKm method should return true', async () => {
        const driver_id = 1
        const minimumKm = 10

        mockedDriverServices.prototype.validateDriver.mockResolvedValue(true);

        const foundDriver = await mockedDriverServices.prototype.validateDriverMinimumKm(driver_id, minimumKm);

        expect(mockedDriverServices.prototype.validateDriverMinimumKm).toHaveBeenCalledWith(driver_id);

        expect(foundDriver).toEqual(true);
    })

    it('validateDriverMinimumKm method should return false', async () => {
        const driver_id = 0
        const minimumKm = 10

        mockedDriverServices.prototype.validateDriver.mockResolvedValue(false);

        const foundDriver = await mockedDriverServices.prototype.validateDriverMinimumKm(driver_id, minimumKm);

        expect(mockedDriverServices.prototype.validateDriverMinimumKm).toHaveBeenCalledWith(driver_id);

        expect(foundDriver).toEqual(false);
    })
})