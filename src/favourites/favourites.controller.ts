import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('favourites')
export class FavouritesController {
  constructor(private readonly svc: FavouritesService) {}

  /** POST /favourites */
  @Post()
  create(@Body() dto: CreateFavouriteDto) {
    return this.svc.create(dto);
  }

  /** GET /favourites/user/:userId */
  @Get('user/:userId')
  findAll(@Param('userId') userId: string) {
    return this.svc.findAllForUser(+userId);
  }

  /** DELETE /favourites/:id */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(+id);
  }
}
