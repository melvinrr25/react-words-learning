FROM nginx:alpine
# copy over static assets
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
# RUN sed -i -e 's/$NGINX_PORT/${PORT}/g' /etc/nginx/conf.d/default.conf
EXPOSE $PORT

CMD sed -i -e 's/$NGINX_PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'