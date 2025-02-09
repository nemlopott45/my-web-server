const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Használj dinamikus portot, hogy működjön a Railway-n
const port = process.env.PORT || 8080;

// Statikus fájlok kiszolgálása
app.use(express.static(path.join(__dirname, 'public')));

// Route-ok
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/page2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chatindex.html'));
});

// Várakozó üzenetek tárolása
let waitingMessages = [];

// WebSocket események kezelése
io.on('connection', (socket) => {
    console.log('Egy felhasználó csatlakozott!');

    // Az új felhasználónak el kell küldeni az összes eddigi üzenetet
    socket.emit('previous messages', waitingMessages);

    // Üzenet fogadása
    socket.on('chat message', (msg) => {
        // Az üzenet hozzáadása a várakozó üzenetekhez
        waitingMessages.push(msg);

        // Az üzenetet minden csatlakozott felhasználónak elküldjük
        io.emit('chat message', msg);
    });

    // Felhasználó lecsatlakozásakor semmi különös nem történik
    socket.on('disconnect', () => {
        console.log('Egy felhasználó lecsatlakozott');
    });
});

// Szerver indítása
server.listen(port, () => {
    console.log(`Szerver fut a http://localhost:${port} címen`);
});
