# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the backend folder to the working directory
COPY backend ./backend

# Change to the backend directory
WORKDIR /app/backend

# Install dependencies
RUN npm install

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
