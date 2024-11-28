import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AdvancedMarker, APIProvider, Map, Pin } from "@vis.gl/react-google-maps";
import Driver from "../types/Driver";
import confirmRideApiCall from "../utils/api/confirmRideApiCall";
export default function TravelOptions() {
    const location = useLocation();
    const { origin, destination, options, distance, duration, value } = location.state.response;
    const positionOrigin = { lat: origin.latitude, lng: origin.longitude };
    const positionDestination = { lat: destination.latitude, lng: destination.longitude };
    const [optionSelected, setOptionSelected] = useState({} as Driver);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setSubmitted(true);

        const originString = origin.latitude + "," + origin.longitude;
        const destinationString = destination.latitude + "," + destination.longitude;

        confirmRideApiCall(
            "cd3c5497-0ad7-4a83-aaee-d4c46251a028", optionSelected.id, originString, destinationString, distance, duration, value);
        //navigate('/reserve', { state: { optionSelected: optionSelected } });
    }

    return (
        <div className="w-full">
            <div className="flex flex-col items-center">
                <h1>Travel Options</h1>
                <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}>
                    <div style={{ height: "60vh", width: "50vw" }}>
                        <Map zoom={12} center={positionOrigin} mapId={process.env.MAP_API_KEY}>
                            <AdvancedMarker position={positionOrigin}>
                                <Pin background={"red"} borderColor={"red"} glyphColor={"purple"} />
                            </AdvancedMarker >
                            <AdvancedMarker position={positionDestination}>
                                <Pin background={"red"} borderColor={"red"} glyphColor={"purple"} />
                            </AdvancedMarker >
                        </Map>
                    </div>
                </APIProvider>
            </div>
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                {options ?
                    options.map((option: Driver) => <div className="flex flex-row gap-2 py-2">
                        <p>{option.name}</p>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setOptionSelected(option)}>Reserve</button>
                    </div>)
                    : null}
                {error ? <p className="text-red-500">{error}</p> : null}
            </form>
        </div>
    )
}

