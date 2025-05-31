# getting the node base image 
FROM node:18

# set working directory inside the container 
WORKDIR /app

# COPY ONLY PACKAGE FILE 
COPY package.json ./

# install dependencies 
RUN npm install
# Globally install nodemon just in case
RUN npm install -g nodemon

# copy the rest of the thing 
COPY . .

# expose backend port 
EXPOSE 8000

# run the backend 
CMD ["npm" , "run" , "dev"]


