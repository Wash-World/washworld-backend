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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@UseGuards(JwtAuthGuard)
@Controller('favourites')
@ApiTags('favourites')
export class FavouritesController {
  constructor(private readonly svc: FavouritesService) {}

  /** POST /favourites */
  @Post()
  @ApiOperation({ summary: 'Create favourite' })
  @ApiResponse({ status: 201, description: 'Favourite created' })
  create(@Body() dto: CreateFavouriteDto) {
    return this.svc.create(dto);
  }

  /** GET /favourites/user/:userId */
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all favourites for user' })
  @ApiResponse({ status: 200, description: 'Favourites found' })
  findAll(@Param('userId') userId: string) {
    return this.svc.findAllForUser(+userId);
  }

  /** DELETE /favourites/:id */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete favourite' })
  @ApiResponse({ status: 200, description: 'Favourite deleted' })
  remove(@Param('id') id: string) {
    return this.svc.remove(+id);
  }
}
