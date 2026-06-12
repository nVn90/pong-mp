# Pong Multiplayer 🏓

A real-time, 2-player multiplayer Pong clone built using Node.js, Express, and Socket.IO.

This project allows two players to connect to the same server, get automatically paired into a room, and play a synchronized game of Pong directly in their web browsers.

---

## Features

- **Automatic Matchmaking:** Automatically pairs connecting players into game rooms (`room0`, `room1`, etc.) as they become ready.
- **Real-Time Synchronization:** Paddle and ball movements are synchronized across players with minimal latency via Socket.IO.
- **Physics Synchronization (Referee Pattern):** One of the players in each room is dynamically assigned as the "Referee" to calculate ball physics and boundary collisions, ensuring authoritative and consistent state synchronization.
- **Responsive Web UI:** Built with HTML5 Canvas and Vanilla CSS.

---

## Tech Stack

- **Backend:** Node.js, Express
- **Real-Time Communication:** Socket.IO
- **Frontend:** HTML5 Canvas, Vanilla JavaScript, CSS3
- **Containerization:** Docker

---

## Project Structure

```text
├── .github/workflows/      # CI/CD Workflows
│   └── main.yml            # GitHub Actions CI configuration
├── public/                 # Client-side static assets
│   ├── javascripts/
│   │   └── script.js       # Client socket logic, Canvas rendering, and game loop
│   ├── stylesheets/
│   │   └── style.css       # Client UI styling
│   └── index.html          # Main HTML structure
├── .dockerignore           # Patterns to ignore when building Docker images
├── .gitignore              # Files to ignore in Git
├── api.js                  # Express application static server setup
├── Dockerfile              # Containerization instructions
├── package.json            # Scripts and dependency declarations
├── server.js               # Entrypoint (initializes HTTP and Socket.IO servers)
└── sockets.js              # Socket.IO connection handling and room routing
```

---

## How it Works (Architecture)

1. **Room Assignment:** When a client connects, they emit a `ready` event. The server groups clients into rooms of 2 (`readyPlayerCount` determines the room number).
2. **Game Start:** Once a room is full, the server sends a `startGame` event containing the Socket ID of the player designated as the "Referee" (the first player who joined).
3. **Game Loop:**
   - The **Referee** player runs the local physics loop (calculating ball speed, direction, boundaries, and score updates) and regularly broadcasts the `ballMove` event to the server.
   - The **Non-Referee** player listens for `ballMove` updates and draws the ball based on the received coordinates.
   - Both players capture their mouse coordinates (`canvas.mousemove`) and broadcast their paddle positions via `paddleMove`.
4. **Clean Exit:** If a player disconnects, the server cleans up the room assignments, updates the ready counts, and safely removes the socket connections.

---

## Quick Start (Local Run)

To run the application locally on your machine without Docker:

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- npm (Node Package Manager)

### Steps

1. Navigate to the project directory:
   ```bash
   cd pong-mp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to:
   👉 **[http://localhost:3000](http://localhost:3000)**

_To test the multiplayer functionality, open **two separate browser windows** side-by-side at that URL!_

---

## Docker Support

For instructions on building, running, and pushing this project using Docker, see the [docker.md](docker.md) guide.
