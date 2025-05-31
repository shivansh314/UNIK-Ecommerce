# Use official Node.js image as the build environment
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Globally install nodemon just in case
RUN npm install -g nodemon

# Copy the rest of the application source code
COPY . .


# Expose port 5173
EXPOSE 5173

# Start Nginx
CMD ["npm", "run", "dev"]