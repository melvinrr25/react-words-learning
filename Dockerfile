FROM smebberson/alpine-nginx-nodejs

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN vite build

COPY /app/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE $PORT

CMD sed -i -e 's/$NGINX_PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'