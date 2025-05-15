import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly repo: Repository<Service>,
  ) {}

  /**
   * Create a new wash service (e.g. Shampoo, Tørring).
   */
  create(dto: CreateServiceDto): Promise<Service> {
    const svc = this.repo.create(dto);
    return this.repo.save(svc);
  }

  /**
   * List all available wash services.
   */
  findAll(): Promise<Service[]> {
    return this.repo.find();
  }
}
