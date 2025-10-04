export const AppConfig = () => ({
  PORT: parseInt(process.env.PORT || '3001', 10),
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/users',
  JWT_SECRET: process.env.JWT_SECRET || 'changeme',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '15m',
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  SERVICE_TOKEN: process.env.SERVICE_TOKEN || 'service-secret-users',
});
