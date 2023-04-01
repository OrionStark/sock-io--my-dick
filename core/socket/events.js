const { getConfiguration } = require("../../utils/common");

const onClientConnected = (socket) => {
    socket.on('join', (data) => {
        if ( data && data.room ) {
            _onRoomSelected(socket, data.room);
        }
    });
};

const _onRoomSelected = (socket, room) => {
    getConfiguration()
    .then(conf => {
        const rooms = conf.rooms;
        if ( rooms.indexOf(room) === -1 ) { 
            socket.emit('err', {message: 'Invalid room name'});
            return;
        }
        socket.join(room);
        socket.emit('acc', 'masuk barang itu bos');
    }).catch(() => {});
};

module.exports = Object.freeze({
    onClientConnected
});