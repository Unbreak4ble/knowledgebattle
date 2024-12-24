FROM node:22.3.0

EXPOSE 8080/tcp

WORKDIR /home

COPY . .

RUN npm install --force

# dev mode
#CMD npm start

# prod/deploy mode
CMD bash run_ssr.sh
