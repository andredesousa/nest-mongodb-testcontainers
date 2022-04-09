import { OpenAPIObject } from '@nestjs/swagger';
import { IEnvironment } from './i.environment';

export const environment: IEnvironment = {
  production: true,
  dbURI: process.env.DB_URI,
  dbName: process.env.DB_NAME,
  dbUsername: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  swaggerInitializer: () => ({} as OpenAPIObject),
};
