import RoutesApiResponse from "./GoogleApi/RoutesApiResponse"

export default interface EstimateRideResponse {
    origin: {
        latitude: number,
        longitude: number
    },
    destination: {
        latitude: number,
        longitude: number
    },
    distance: number,
    duration: string,
    options: [
        {
            id: number,
            name: string,
            description: string,
            vehicle: string,
            review: {
                rating: number,
                comment: string
            },
            value: number
        }
    ],
    routesResponse: RoutesApiResponse
}