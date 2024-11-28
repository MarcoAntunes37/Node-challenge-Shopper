export default interface EstimateRideApiResponse {
    response: {
        origin: {
            latitude: number,
            longitude: number
        },
        destination: {
            latitude: number,
            longitude: number
        },
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
        distance: number,
        duration: string,
        routeResponse: {
            routes: [
                {
                    distanceMeters: number,
                    duration: string,
                    polyline: {
                        encodedPolyline: string
                    }
                }
            ]
        },
    }
}