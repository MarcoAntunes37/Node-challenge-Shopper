import axios from "axios";

export default function estimateRideApiCall(userId: string, origin: string, destination: string) {
    const url = `http://localhost:8080/rides/estimate`;
    const headers = { 'Content-Type': 'application/json' };
    const data = {
        customer_id: userId,
        origin: origin,
        destination: destination
    };

    const response = axios.post(url, data, { headers });

    return response;
}