FROM node:18.13.0
WORKDIR /app
COPY package.json /app/
RUN npm install
RUN npm install -g @angular/cli
EXPOSE 4200
CMD [ "ng","serve","--host","0.0.0.0" ]