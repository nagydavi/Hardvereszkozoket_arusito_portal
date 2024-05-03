FROM node:18.13.0
WORKDIR /app
COPY package.json /app/
RUN npm install
RUN npm install -g @angular/cli
EXPOSE 4200
RUN npm install -g @angular/cli
RUN npm install @angular/flex-layout --save
RUN npm install --save openai
CMD [ "ng","serve","--host","0.0.0.0" ]



