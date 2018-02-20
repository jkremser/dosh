FROM alpine:3.7
# adding telnet, dig, socat
RUN apk --update --no-cache add busybox-extras curl socat bind-tools \
    && rm -rf /var/cache/apk/*
