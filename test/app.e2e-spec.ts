import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { sign } from 'jsonwebtoken';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(function (done) {
    token = sign(
      { origin: 'someOrigin', resource: 'someResource', timestamp: Date.now() },
      process.env.SECRET,
    );
    done();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/ping')
      .expect(200)
      .expect('Pong!');
  });

  it('/emails (PUT) - 403', () => {
    return request(app.getHttpServer())
      .put('/emails')
      .send({ email: 'some@email.com' })
      .expect(403);
  });

  it('/emails (PUT) - 401', () => {
    return request(app.getHttpServer())
      .put('/emails')
      .set({ Authorization: `Bearer someRandomToken` })
      .send({ email: 'some@email.com' })
      .expect(401);
  });

  it('/emails (PUT) - 200 | 500', () => {
    return request(app.getHttpServer())
      .put('/emails')
      .set({ Authorization: `Bearer ${token}` })
      .send({ email: 'some@email.com' })
      .expect('Content-Type', /json/);
  });
});
