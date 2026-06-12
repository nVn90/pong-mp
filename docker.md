# Docker Operations Guide 🐳

This guide provides a comprehensive reference of all Docker commands used to build, test, deploy, monitor, and clean up the **Pong Multiplayer** container.

---

## Constants Used in This Guide

- **Image Name/Tag:** `<your-dockerhub-username>/pong-game`
- **Container Name:** `pong-game`
- **Port Mapping:** `3000:3000` (Host:Container)

---

## 🚀 Standard Commands

### 1. Build the Image

Build the Docker image locally from the root folder containing the `Dockerfile`:

```bash
docker build -t <your-dockerhub-username>/pong-game .
```

### 2. Run the Container (Background Mode)

Run the application in the background (detached mode) and expose it on port `3000`:

```bash
docker run -d -p 3000:3000 --name pong-game <your-dockerhub-username>/pong-game
```

### 3. Run the Container (Foreground Mode)

Run the application in the foreground so you can see live logs directly in your current console window:

```bash
docker run -it -p 3000:3000 --name pong-game <your-dockerhub-username>/pong-game
```

---

## 📊 Monitoring & Logging

### View Container Logs

Streams logs from the application (useful to see when players join or disconnect):

```bash
docker logs -f pong-game
```

### List Running Containers

Check if the container is currently active and healthy:

```bash
docker ps
```

### List All Containers

List all containers, including stopped or failed ones:

```bash
docker ps -a
```

---

## ⚙️ Lifecycle Management

### Stop the Container

Temporarily stops the running server without deleting it:

```bash
docker stop pong-game
```

### Start the Container

Start a container that has been stopped:

```bash
docker start pong-game
```

### Restart the Container

Quickly restart the running server container:

```bash
docker restart pong-game
```

### Delete/Remove the Container

Deletes the container instance (required before re-running a newly built image under the same container name):

```bash
docker rm -f pong-game
```

---

## 🛠️ Advanced Operations & Publishing

### SSH/Shell Access

Execute an interactive shell session inside the running container to inspect files or paths:

```bash
docker exec -it pong-game sh
```

### Publish to Docker Hub

1. Log in to Docker Hub:
   ```bash
   docker login
   ```
2. Push the built image to your repository:
   ```bash
   docker push <your-dockerhub-username>/pong-game
   ```

### Pull from Docker Hub

To pull the published image onto another environment or server:

```bash
docker pull <your-dockerhub-username>/pong-game
```

### Clean Up Untagged/Dangling Images

Clears cached Docker build steps and dangling images to free up space:

```bash
docker image prune -f
```
