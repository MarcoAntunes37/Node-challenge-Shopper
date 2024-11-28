export default interface Driver {
    id: number;
    name: string;
    description: string;
    car: string;
    rating: {
        rating: number;
        comment: string
    };
    tax: number;
    minimum_km: number;
}