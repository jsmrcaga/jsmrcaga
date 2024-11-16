FROM alpine:3.19.4

WORKDIR /app

COPY . /app

RUN apk add gettext

CMD ["sh", "./write.sh"]
