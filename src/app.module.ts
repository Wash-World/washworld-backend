// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MembershipsModule } from './memberships/memberships.module';
import { ServicesModule } from './services/services.module';
import { FavouritesModule } from './favourites/favourites.module';
import { WashHistoryModule } from './wash-history/wash-history.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { AuthModule } from './auth/auth.module';
import { HelpModule } from './help/help.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Load .env and make ConfigService available everywhere
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
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

    UsersModule,
    MembershipsModule,
    ServicesModule,
    FavouritesModule,
    WashHistoryModule,
    FeedbacksModule,
    AuthModule,
    HelpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
