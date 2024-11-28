import React, { useEffect, useState } from 'react';
import estimateRideApi from '../utils/api/estimateRideApiCall';
import { useNavigate } from 'react-router-dom';
import EstimateRideApiResponse from '../types/EstimateRideApiResponse';
export default function TravelRequest() {
    const [Origin, setOrigin] = useState('');
    const [Destination, setDestination] = useState('');
    const [UserId] = useState('cd3c5497-0ad7-4a83-aaee-d4c46251a028');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setSubmitted(true);

        estimateRideApi(UserId, Origin, Destination)
            .then((response) => {
                if (response.data.error_code) {
                    setError(response.data.error_description);
                } else {
                    navigateToNextStep(response.data);
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    const navigateToNextStep = (response: EstimateRideApiResponse) => {
        navigate('/travel-options', { state: { response: response } });
    };

    return (
        <div className="bg-gray-100 text-black h-screen p-4 flex justify-center">
            <form className="flex flex-col w-1/3 justify-start space-y-4 bg-white p-4 rounded shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-3xl font-bold mb-4">Estimate a Travel</h2>
                <label className='flex flex-col space-y-2'>
                    <p className='text-bold py-1'>UserId:</p>
                    <input className='border border-gray-300 rounded p-2' type="text" value={UserId} disabled />
                </label>
                <label className='flex flex-col space-y-2'>
                    <p className='text-bold py-1'>Origin:</p>
                    <input className='border border-gray-300 rounded p-2' type="text" value={Origin} onChange={(event) => setOrigin(event.target.value)} />
                </label>
                <label className='flex flex-col space-y-2'>
                    <p className='text-bold py-1'>Destintation:</p>
                    <input className='border border-gray-300 rounded p-2' type="text" value={Destination} onChange={(event) => setDestination(event.target.value)} />
                </label>
                {error && submitted && <p className="text-red-500">{error}</p>}
                <button type="submit" className="px-4 py-2 rounded bg-blue-500 text-white hover:underline" >Submit</button>
            </form>
        </div>
    );
};