FROM alpine:latest

#Setup environment variables
ENV DATABASE_PATH=/data/weather.db 

#Install SQLite
RUN apk add --no-cache sqlite

#Create a directory for the database
RUN mkdir -p /data

WORKDIR /data

VOLUME ["/data"]

CMD ["sh", "-c", "sqlite3 /data/weather.db && tail -f /dev/null"]
