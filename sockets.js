
let readyPlayerCount = 0;

function listen(socketServer) {
  const pongNameSpace = socketServer.of("/pong");
  pongNameSpace.on("connection", (socket) => {
    let room;
    console.log("A user connected", socket.id);
    socket.on("ready", () => {
      room = `room${Math.floor(readyPlayerCount / 2)}`;
      socket.join(room);
      console.log(`Player ${socket.id} is ready and joined ${room}`);

      readyPlayerCount++;

      if (readyPlayerCount % 2 === 0) {
        console.log("Two players are ready. Starting the game...");
        pongNameSpace.in(room).emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.to(room).emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.to(room).emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log("A user disconnected", socket.id, "with reason:", reason);
      readyPlayerCount = Math.max(readyPlayerCount - 1, 0);
      socket.leave(room);
    });
  });
}

module.exports = { listen };
