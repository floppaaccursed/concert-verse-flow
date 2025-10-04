import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { JwtService } from '@nestjs/jwt';

describe('Concerts E2E', () => {
  let app: INestApplication;
  let jwt: string;

  beforeAll(async () => {
    process.env.JWT_SECRET = 'testsecret';
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    const jwtService = app.get(JwtService);
    jwt = await jwtService.signAsync({ sub: 'user1', email: 'x@y.com', role: 'user' }, { secret: process.env.JWT_SECRET });
  });

  afterAll(async () => {
    await app.close();
  });

  it('creates a concert (auth required)', async () => {
    const server = app.getHttpServer();

    const res = await request(server)
      .post('/api/v1/concerts')
      .set('Authorization', `Bearer ${jwt}`)
      .send({
        title: 'Unit Test Show',
        genres: ['rock'],
        venue: { name: 'Test Hall', city: 'Rome', country: 'IT' },
        date: new Date().toISOString(),
        availableTickets: 50
      })
      .expect(201);

    expect(res.body.title).toBe('Unit Test Show');
  });
});
