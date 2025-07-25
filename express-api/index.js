const http = require('http');
const app = require('./src/config/app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT);

server.on('listening', () => {
    console.log(`Conexión establecida http://localhost:${PORT}`);
});

server.on('error', (error) => {
    console.error('Fallo en la conexión', error);
});