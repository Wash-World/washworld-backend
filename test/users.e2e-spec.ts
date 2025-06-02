import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST) should create a user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Eowyn',
        lastname: 'Shieldmaiden',
        email: 'eowyn@lotr.com',
        password: 'RohanStrong!',
        mobile_num: '11223344',
        carplate: 'R0HAN',
        membership_id: 1,
        card_owner: 'Eowyn Shieldmaiden',
        card_number: '1234567890123456',
        expiry_date: '12/30',
        cvv: '123',
        assigned_location_api_id: 'dk-roskilde-01', 
        all_locations: false, 
      });

    console.log('❗ RESPONSE STATUS:', response.status);
    console.log('❗ RESPONSE BODY:', JSON.stringify(response.body, null, 2));

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: 'Eowyn',
        lastname: 'Shieldmaiden',
        email: 'eowyn@lotr.com',
      }),
    );
    expect((response.body as any).password).toBeUndefined();
  });
});

