export const AppConfig = () => ({
  PORT: parseInt(process.env.PORT || '3002', 10),
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/platform',
  JWT_SECRET: process.env.JWT_SECRET || 'changeme',
  SERVICE_TOKEN: process.env.SERVICE_TOKEN || 'service-secret-platform',
});
