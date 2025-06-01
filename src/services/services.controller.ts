import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './entities/service.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller('services')
@ApiTags('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  /**
   * POST /services
   */
  @Post()
  @ApiOperation({
    summary: 'Create a new wash service (e.g. Shampoo, Tørring)',
  })
  @ApiResponse({
    status: 201,
    description: 'The service has been successfully created.',
  })
  create(@Body() dto: CreateServiceDto): Promise<Service> {
    return this.servicesService.create(dto);
  }

  /**
   * GET /services
   */
  @Get()
  @ApiOperation({ summary: 'List all available wash services' })
  @ApiResponse({
    status: 200,
    description: 'List of all available wash services.',
  })
  findAll(): Promise<Service[]> {
    return this.servicesService.findAll();
  }
}
