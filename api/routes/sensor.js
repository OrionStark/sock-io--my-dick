const router = require('express').Router();

module.exports = (socketServer) => {
    const sensorController = require('../controllers/sensor')(socketServer);

    router.patch('/sensor/update', sensorController.updateSensorData);

    return router;
};