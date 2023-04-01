const { broadcastSensorLatestData } = require("../../core/socket/emitter");

module.exports = (socketServer) => {
    const updateSensorData = (req, res, next) => {
        const body = req.body;
        const room = body.room ?? '';
        broadcastSensorLatestData(socketServer, room, body.value ?? 0)
        .then(() => {
            res.json({message: 'data updated'});
        }).catch(err => next(err));
    };

    return Object.freeze({
        updateSensorData
    });
};