FROM node:6.9-slim
MAINTAINER Time Inc <ramesh.anandhan@timeinc.com>

COPY ./ /var/app/current

ADD package.json /tmp/package.json
RUN cd /tmp && \
    npm set progress=false && \
    npm install --production --progress=false && \
    cp -a /tmp/node_modules /var/app/current/

WORKDIR /var/app/current
EXPOSE 8090
CMD ["node", "--max_old_space_size=3000" ,"app.js"]
