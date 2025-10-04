import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

describe('Auth E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.JWT_SECRET = 'testsecret';
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, MongooseModule.forRoot('mongodb://localhost:27017/users_test')],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await mongoose.disconnect();
  });

  it('registers and logs in', async () => {
    const server = app.getHttpServer();

    const reg = await request(server)
      .post('/api/v1/auth/register')
      .send({ email: 'test@example.com', password: 'Password123!' })
      .expect(201);
    expect(reg.body.accessToken).toBeDefined();

    const login = await request(server)
      .post('/api/v1/auth/login')
      .send({ email: 'test@example.com', password: 'Password123!' })
      .expect(200);
    expect(login.body.accessToken).toBeDefined();
  });
});
