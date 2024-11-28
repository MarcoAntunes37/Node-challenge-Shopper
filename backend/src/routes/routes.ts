import express from 'express';
import RideController from '../controller/RideController';

const router = express.Router();

const rideController = new RideController();

router.get('/rides/:customer_id', rideController.getRidesFiltered);

router.post('/rides/estimate', rideController.estimateRide);

router.patch('/rides/confirm', rideController.confirmRide);

export default router;