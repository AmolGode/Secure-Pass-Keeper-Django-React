# Use an official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production=false

# Copy the rest of the application code
COPY . /frontend

# Build the React apps
RUN npm run build

# Expose the port that the app will run on
EXPOSE 5173

# Set environment variable for API base URL
ENV REACT_APP_API_BASE_URL=http://127.0.0.1:8000

# Command to run the application
CMD ["npm", "run", "dev"]
