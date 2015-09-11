FROM ubuntu:14.04
MAINTAINER Thierry Neel <Thierry.Neel@verifone.com>
RUN apt-get update
# Node + npm + git
RUN apt-get -y install nodejs
RUN apt-get -y install npm
RUN sudo ln -s /usr/bin/nodejs /usr/bin/node
#curl
RUN apt-get -y install curl
# Hapi
RUN npm install hapi

# Expose ports.
# - 80: HTTP
EXPOSE 80
# Start
CMD ["node", "startServer.js"]