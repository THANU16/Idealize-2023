# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app/client

# Copy package.json and package-lock.json to install dependencies
COPY ./client/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the frontend code into the container
COPY ./client ./

# Expose the port for the frontend
EXPOSE 3000

# Command to start the frontend
CMD ["npm", "start"]