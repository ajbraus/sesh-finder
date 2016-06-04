FROM node:4-onbuild

MAINTAINER Adam Braus <ajbraus@gmail.com>

ENV NODE_ENV production

RUN mkdir -p /usr/src/app

ADD startup.sh /

WORKDIR /usr/src/app

EXPOSE 3000

CMD ["/bin/bash", "/startup.sh"]