const http = require("http");
const io = require("socket.io");

const apiServer = require("./api");
const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer, {
  cors: {
    origin: "https://pong.scorpionshadow.com",
    methods: ["GET", "POST"],
  },
});

const sockets = require("./sockets");

const PORT = 8002;
httpServer.listen(PORT);
console.log(`Server is running on port http://localhost:${PORT}`);

sockets.listen(socketServer);
