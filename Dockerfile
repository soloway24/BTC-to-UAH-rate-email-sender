FROM alpine:3.15 as builder
RUN apk add --update npm
WORKDIR /src/app
COPY package*.json ./
RUN npm install
COPY ./src ./src

FROM alpine:3.15
RUN apk add --update npm
EXPOSE 8080
WORKDIR /app
COPY --from=builder /src/app /app
CMD ["npm", "start"]