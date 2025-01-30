const express = require('express');
const router = express.Router();
const droneQueries = require('./droneQueries')

router.post('/drones', droneQueries.createDrone);

router.get('/drones/:id', droneQueries.getDroneById);

router.put('/drones/:id', droneQueries.updateDrone);

router.delete('/drones/:id', droneQueries.deleteDrone);

router.get('/drones', droneQueries.getAllDrones);


module.exports = router