const { getConfiguration } = require("../../utils/common");

const broadcastSensorLatestData = (socketServer, room, data) => {
    return new Promise((resolve, reject) => {
        getConfiguration()
        .then(conf => {
            const rooms = conf.rooms;
            if ( rooms.indexOf(room) === -1 ) { return reject(new Error('Invalid room name')); }
            socketServer.to(room).emit('u', {room, data});
            resolve();
        }).catch(err => reject(err));
    });
};

module.exports = Object.freeze({
    broadcastSensorLatestData
});