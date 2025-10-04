# Platform Service (NestJS + Mongoose)

- API base: `/api/v1`
- Swagger UI: `/api/docs`
- Health: `/health`

## Environment Variables

- `PORT` (default 3002)
- `MONGO_URI` (e.g., `mongodb://platform-mongo:27017/platform`)
- `JWT_SECRET` (shared across services)
- `SERVICE_TOKEN` (service-to-service secret)

## Run locally

```bash
npm install
npm run start:dev
```

## Seed

```bash
MONGO_URI="mongodb://localhost:27017/platform" npm run seed
```

## Test

```bash
npm test
```

## Docker

```bash
docker build -t platform-service:local .
```
