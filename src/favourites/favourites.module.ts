import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favourite } from './entities/favourite.entity';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favourite, User])],
  providers: [FavouritesService],
  controllers: [FavouritesController],
})
export class FavouritesModule {}
