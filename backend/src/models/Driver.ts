export default interface Driver {
    id: number;
    name: string;
    description: string;
    car: string;
    rating: string;
    tax: number;
    minimum_km: number;
    createdAt: Date;
    updatedAt: Date;
}