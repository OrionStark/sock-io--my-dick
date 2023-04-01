const express = require('express');
const bp = require('body-parser');
const { createServer } = require('http');
const helmet = require('helmet');

const app = express();
app.use(bp.json({ limit: 100000 }));
app.use(bp.urlencoded({extended: true}));
app.use(helmet());
const server = createServer(app);

const { Server } = require('socket.io');
const { getConfiguration } = require('./utils/common');
const socketServer = new Server(server, { transports: ['websocket'] });
const socketEvents = require('./core/socket/events');

const sensorRoutes = require('./api/routes/sensor')(socketServer);
app.use(sensorRoutes);
app.use((err, req, res, next) => {
    return res.status(500).json({
        message: err.message ?? 'Unknown error',
    });
});

socketServer.on('connection', (socket) => socketEvents.onClientConnected(socket));

getConfiguration()
.then(conf => {
    server.listen(conf.port, () => {
        console.log(`Server started on ${conf.port}`);
    });
}).catch(err => {
    console.error(err);
    process.exit();
});