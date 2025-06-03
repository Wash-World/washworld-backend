import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../src/users/entities/user.entity';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  const testUserEmail = 'testuser@example.com';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dataSource = moduleFixture.get<DataSource>(getDataSourceToken());
  });

  afterAll(async () => {
    await app.close();
  });

  // Delete test user after each test to keep DB clean
  afterEach(async () => {
    await dataSource.getRepository(User).delete({ email: testUserEmail });
  });

  it('/auth/login (POST) - login without pre-creating user should fail', async () => {
    // Arrange
    const loginDto = {
      email: 'nonexistent@example.com',
      password: 'wrongpassword',
    };

    await request(app.getHttpServer())
      // Act
      .post('/auth/login')
      .send(loginDto)

      // Assert
      .expect(401); // Unauthorized, since user does not exist
  });

  it('/auth/login (POST) - create user first, then login', async () => {
    // Arrange
    const loginDto = {
      email: testUserEmail,
      password: 'correct_password',
    };

    await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Test',
        lastname: 'User',
        email: loginDto.email,
        password: loginDto.password,
        mobile_num: '12345678',
        carplate: 'AB12345',
        assigned_location_api_id: '1',
        all_locations: true,
        card_owner: 'Test User',
        card_number: '4242424242424242',
        expiry_date: '12/30',
        cvv: '123',
        membership_id: 1,
      })
      .expect(201);

    // Act
    await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(201)
      .expect((res) => {
        // Assert
        expect(res.body).toHaveProperty('access_token');
        expect(typeof res.body.access_token).toBe('string');
        expect(res.body).toHaveProperty('user');
        expect(res.body.user.email).toBe(loginDto.email);
      });
  });
});
