import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Load .env and make ConfigService available everywhere
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configure TypeORM using values from process.env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST'),
        port: config.get<number>('DATABASE_PORT'),
        username: config.get<string>('DATABASE_USER'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        autoLoadEntities: true, // picks up all @Entity() classes
        synchronize: true, // dev only! auto-creates/migrates tables
      }),
      inject: [ConfigService],
    }),

    // Your feature modules here
    UsersModule,
  ],
})
export class AppModule {}
