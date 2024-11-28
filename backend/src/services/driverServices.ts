import DriverRepository from "../repositories/driverRepository";

export default class DriverServices {
    driverRepository: DriverRepository = new DriverRepository();

    async findAllDrivers(minimumKm: number) {
        const drivers = await this.driverRepository.findAllDrivers(minimumKm);

        return drivers;
    }

    async findDriverById(id: number) {
        const driver = await this.driverRepository.findDriverById(id);
        if (!driver) {
            throw new Error(`Driver id does not exist`);
        }

        return driver;
    }

    async validateDriver(driver_id: number) {
        const driver = await this.driverRepository.findDriverById(driver_id);

        if (!driver) {
            return false
        }

        return true
    }

    async validateDriverMinimumKm(driver_id: number, minimumKm: number) {
        const driver = await this.driverRepository.findDriverById(driver_id);

        if (!driver) {
            return false
        }

        if (driver.minimum_km > minimumKm) {
            return false
        }

        return true
    }
}
