FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the rest of the application source code
COPY . .

# Expose port 3000 (as defined in server.js)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

