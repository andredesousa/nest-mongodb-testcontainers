import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { GenericContainer } from 'testcontainers';
import * as request from 'supertest';
import { environment } from '../../src/environments/environment';
import { AppModule } from '../../src/app/app.module';
import { ProductDto } from '../../src/app/dtos/product.dto';

/* eslint-disable no-underscore-dangle */
describe('App (e2e)', () => {
  let app: INestApplication;
  let productId: string;

  beforeAll(async () => {
    const mongo = await new GenericContainer('mongo')
      .withExposedPorts(27017)
      .withEnv('MONGO_INITDB_ROOT_USERNAME', 'root')
      .withEnv('MONGO_INITDB_ROOT_PASSWORD', 'secret')
      .start();

    environment.dbURI = `mongodb://localhost:${mongo.getMappedPort(27017)}`;

    const moduleFixture = await Test.createTestingModule({ imports: [AppModule] }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/');

    expect(response.status).toBe(200);
  });

  it('/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/')
      .send({ name: 'Milk', currency: '€', price: 0.65, quantity: 1, unit: 'L' } as ProductDto);

    productId = response.body._id;
    expect(response.status).toBe(201);
  });

  it('/{id} (GET)', async () => {
    const response = await request(app.getHttpServer()).get(`/${productId}`);

    expect(response.status).toBe(200);
  });

  it('/{id} (PUT)', async () => {
    const response = await request(app.getHttpServer())
      .put(`/${productId}`)
      .send({ name: 'Fresh Milk', currency: '€', price: 0.65, quantity: 1, unit: 'L' } as ProductDto);

    expect(response.status).toBe(200);
  });

  it('/{id} (DELETE)', async () => {
    const response = await request(app.getHttpServer()).delete(`/${productId}`);

    expect(response.status).toBe(200);
  });
});
