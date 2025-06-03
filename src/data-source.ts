import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Favourite } from './favourites/entities/favourite.entity';
import { Feedback } from './feedbacks/entities/feedback.entity';
import { Membership } from './memberships/entities/membership.entity';
import { Service } from './services/entities/service.entity';
import { User } from './users/entities/user.entity';
import { WashHistory } from './wash-history/entities/wash-history.entity';

dotenv.config(); // ✅ Load .env values

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false, // ✅ Required for migrations
  logging: true,
  entities: [User, Membership, Service, WashHistory, Feedback, Favourite],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations',
});
