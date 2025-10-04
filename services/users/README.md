# Users Service (NestJS + Mongoose)

- API base: `/api/v1`
- Swagger UI: `/api/docs`
- Health: `/health`

## Environment Variables

- `PORT` (default 3001)
- `MONGO_URI` (e.g., `mongodb://users-mongo:27017/users`)
- `JWT_SECRET` (shared across services)
- `JWT_EXPIRES_IN` (default `15m`)
- `REFRESH_TOKEN_EXPIRES_IN` (default `7d`)
- `SERVICE_TOKEN` (service-to-service secret)

## Run locally

```bash
npm install
npm run start:dev
```

## Seed

```bash
MONGO_URI="mongodb://localhost:27017/users" npm run seed
```

## Test

```bash
npm test
```

## Docker

```bash
docker build -t users-service:local .
```
