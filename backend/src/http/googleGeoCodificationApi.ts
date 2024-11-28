import axios from 'axios';
// import dotenv from 'dotenv';
import GeoCodeApiResponse from '../types/responses/GoogleApi/GeoCodeApiResponse';

// dotenv.config();

export default async function callGeoCodificationApi(origin: string, destination: string): Promise<GeoCodeApiResponse> {
    var geoLocationApiData = {
        origin: {
            lat: 0,
            lng: 0
        },
        destination: {
            lat: 0,
            lng: 0
        }
    }

    const formattedOrigin = origin.replace(" ", "+");
    const formattedDestination = destination.replace(" ", "+");

    await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedOrigin}&key=${process.env.GOOGLE_API_KEY}`, {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'json'
    })
        .then((res) => {
            if (res.data.results[0] !== undefined) {
                const { lat, lng } = res.data.results[0].geometry.location
                geoLocationApiData.origin.lat = lat

                geoLocationApiData.origin.lng = lng
            }
        })
        .catch((error) => {
            console.log(error);
            throw new Error("Error calling google geocodification api");
        });

    await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedDestination}&key=${process.env.GOOGLE_API_KEY}`, {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'json'
    })
        .then((res) => {
            if (res.data.results[0] !== undefined) {
                const { lat, lng } = res.data.results[0].geometry.location
                geoLocationApiData.destination.lat = lat
                geoLocationApiData.destination.lng = lng
            }
        })
        .catch((error) => {
            console.log(error);
            throw new Error("Error calling google geocodification api");
        });

    return geoLocationApiData;
}