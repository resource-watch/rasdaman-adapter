FROM node:7.7-alpine
MAINTAINER enrique.cornejo@vizzuality.com

ENV NAME rasdaman-adapter
ENV USER rasdaman-adapter
ENV OCV_VERSION 3.2.0
ENV CC /usr/bin/clang
ENV CXX /usr/bin/clang++
ENV NPROC 2
RUN echo "@edge-testing http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories

RUN apk update && apk upgrade && \
    apk add --no-cache --update \
    bash git openssh python alpine-sdk \
     build-base \
     clang \
     clang-dev \
     cmake \	   
     git \ 
     pkgconf \
     wget \
     libtbb@edge-testing \
     libtbb-dev@edge-testing \
     libjpeg \
     libjpeg-turbo-dev \
     libpng \
     libpng-dev \
     libwebp \
     libwebp-dev \
     tiff \
     tiff-dev \
     libjasper \
     jasper-dev \
     python \
     python-dev \
     linux-headers \
     py-pip

RUN pip install numpy

# Compiling OpenCV
WORKDIR /tmp
RUN wget -nv -O opencv-$OCV_VERSION.tar.gz https://github.com/opencv/opencv/archive/$OCV_VERSION.tar.gz
RUN tar -zxf opencv-$OCV_VERSION.tar.gz
WORKDIR /tmp/opencv-$OCV_VERSION
RUN mkdir build
WORKDIR /tmp/opencv-$OCV_VERSION/build
RUN cmake \
    -D CMAKE_BUILD_TYPE=RELEASE \
    -D CMAKE_INSTALL_PREFIX=/usr/local \
    -D WITH_FFMPEG=NO \
    -D WITH_IPP=NO \
    -D WITH_OPENEXR=NO \
    -D WITH_TBB=YES \
    -D WITH_1394=NO \
    -D BUILD_PERF_TESTS=OFF \
    -D BUILD_TESTS=OFF ..
RUN make -j$NPROC
RUN make install

RUN addgroup $USER && adduser -s /bin/bash -D -G $USER $USER

RUN npm install -g grunt-cli bunyan pm2

RUN mkdir -p /opt/$NAME
COPY package.json /opt/$NAME/package.json
RUN cd /opt/$NAME && npm install

COPY entrypoint.sh /opt/$NAME/entrypoint.sh
COPY config /opt/$NAME/config

WORKDIR /opt/$NAME

COPY ./app /opt/$NAME/app
RUN chown $USER:$USER /opt/$NAME

# Tell Docker we are going to use this ports
EXPOSE 3075
USER $USER

ENTRYPOINT ["./entrypoint.sh"]
