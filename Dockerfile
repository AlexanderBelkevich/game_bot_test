FROM node:24-alpine AS web
WORKDIR /app/web
COPY web/package*.json ./
RUN npm ci
COPY web/ ./
RUN npm run build

FROM node:24-alpine
WORKDIR /app/server
ENV NODE_ENV=production
COPY server/package*.json ./
RUN npm ci --omit=dev
COPY server/src ./src
COPY --from=web /app/web/dist /app/web/dist
ENV STATIC_DIR=/app/web/dist
ENV PORT=3000
EXPOSE 3000
CMD ["node", "src/server.ts"]
