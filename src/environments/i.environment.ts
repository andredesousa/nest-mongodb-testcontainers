import { INestApplication } from '@nestjs/common';
import { OpenAPIObject } from '@nestjs/swagger';

export interface IEnvironment {
  production: boolean;
  dbURI: string;
  dbName: string;
  dbUsername: string;
  dbPassword: string;
  swaggerInitializer: (app: INestApplication) => OpenAPIObject;
}
