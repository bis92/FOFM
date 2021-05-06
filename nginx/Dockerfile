FROM nginx

EXPOSE 80

RUN rm /usr/share/nginx/html/*

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]