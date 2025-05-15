import { Controller, Post, Body, Get } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './entities/service.entity';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  /**
   * POST /services
   */
  @Post()
  create(@Body() dto: CreateServiceDto): Promise<Service> {
    return this.servicesService.create(dto);
  }

  /**
   * GET /services
   */
  @Get()
  findAll(): Promise<Service[]> {
    return this.servicesService.findAll();
  }
}
