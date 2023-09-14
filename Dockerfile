# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Expose the desired port (e.g., 3000)
EXPOSE 3000

# Set environment variables (if needed)
# ENV ENV_VARIABLE_NAME value

# Start the Node.js application
CMD ["npm", "start"]