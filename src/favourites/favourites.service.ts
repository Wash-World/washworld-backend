import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favourite } from './entities/favourite.entity';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(Favourite)
    private readonly favRepo: Repository<Favourite>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateFavouriteDto): Promise<Favourite> {
    // 1) Ensure user exists
    const user = await this.userRepo.findOne({ where: { id: dto.user_id } });
    if (!user) throw new NotFoundException('User not found');

    // 2) Create and save
    const fav = this.favRepo.create({
      user,
      location_api_id: dto.location_api_id,
    });
    return this.favRepo.save(fav);
  }

  findAllForUser(user_id: number): Promise<Favourite[]> {
    return this.favRepo.find({
      where: { user: { id: user_id } },
    });
  }

  async remove(fav_location_id: number): Promise<void> {
    await this.favRepo.delete(fav_location_id);
  }
}
