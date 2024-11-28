export default interface Ride {
    id: number;
    customer_id: string;
    driver_id: number;
    datetime: Date;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    value: number;
    createdAt: Date;
    updatedAt: Date;
}