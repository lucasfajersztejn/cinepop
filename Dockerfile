FROM node:18.20.2 as builder

ARG VITE_GOOGLE_API_KEY
ENV VITE_GOOGLE_API_KEY $VITE_GOOGLE_API_KEY

COPY ./web /opt/cinepop-web
WORKDIR /opt/cinepop-web
RUN npm ci
RUN npm run build

FROM node:18.20.2-alpine3.19

COPY ./api /opt/cinepop
WORKDIR /opt/cinepop
COPY --from=builder /opt/cinepop-web/dist /opt/cinepop/web/build
RUN npm ci --only=production

EXPOSE 3000
CMD ["npm", "start"]