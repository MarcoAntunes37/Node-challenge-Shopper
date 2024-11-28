import axios from 'axios';
import GeoCodeApiResponse from '../types/responses/GoogleApi/GeoCodeApiResponse';
import mapRoutesApiData from '../utils/mapRoutesApiData';
import RoutesApiResponse from '../types/responses/GoogleApi/RoutesApiResponse';

export default async function callRoutesApi(geoCodeApiResponse: GeoCodeApiResponse): Promise<RoutesApiResponse> {
    const { origin, destination } = geoCodeApiResponse

    const routesApiData = await mapRoutesApiData(origin, destination)

    const routesApiResponse: RoutesApiResponse = await axios.post(
        'https://routes.googleapis.com/directions/v2:computeRoutes',
        routesApiData,
        {
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': `${process.env.GOOGLE_API_KEY}`,
                'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline'
            },
        })
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            console.log(error);
            throw new Error("Error calling google routes api");
        });

    return routesApiResponse
}