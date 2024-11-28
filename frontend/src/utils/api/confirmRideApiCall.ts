import axios from "axios";

export default function confirmRideApiCall(customer_id: string, driver_id: number, origin: string, destination: string, distance: number, duration: string, value: number) {
    const url = `http://localhost:8080/rides/confirm`;
    const headers = { 'Content-Type': 'application/json' };
    const data = {
        customer_id: customer_id,
        driver_id: driver_id,
        origin: origin,
        destination: destination,
        distance: distance,
        duration: duration,
        value: value
    };
    console.log(data)
    const response = axios.patch(url, data, { headers });

    return response;
}