export default interface RoutesApiResponse {
    routes: [
        {
            duration: string;
            distanceMeters: number;
            polyline: {
                encodedPolyline: string;
            }
        }
    ]
}