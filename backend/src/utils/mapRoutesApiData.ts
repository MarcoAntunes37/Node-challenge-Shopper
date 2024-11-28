import GeoLocationApiData from "../types/GeoLocationApiData";

export default async function mapRoutesApiData(origin: GeoLocationApiData, destiny: GeoLocationApiData) {
    var routesApiData = {
        origin: {
            location: {
                latLng: {
                    latitude: origin.lat,
                    longitude: origin.lng
                }
            }
        },
        destination: {
            location: {
                latLng: {
                    latitude: destiny.lat,
                    longitude: destiny.lng
                }
            }
        },
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_AWARE",
        computeAlternativeRoutes: false,
        routeModifiers: {
            avoidTolls: false,
            avoidHighways: false,
            avoidFerries: false
        },
        languageCode: "en-US",
        units: "IMPERIAL"
    };

    return routesApiData
}