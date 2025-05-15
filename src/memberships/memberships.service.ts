import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Membership } from './entities/membership.entity';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { Service } from '../services/entities/service.entity';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipsRepo: Repository<Membership>,

    @InjectRepository(Service)
    private readonly servicesRepo: Repository<Service>,
  ) {}

  async create(dto: CreateMembershipDto): Promise<Membership> {
    // 1) Fetch the requested services
    const services = await this.servicesRepo.find({
      where: { service_id: In(dto.serviceIds) },
    });

    if (services.length !== dto.serviceIds.length) {
      throw new NotFoundException('One or more services not found');
    }

    // 2) Create & save the membership with its services
    const membership = this.membershipsRepo.create({
      plan: dto.plan,
      price: dto.price,
      duration_wash: dto.duration_wash,
      services,
    });
    return this.membershipsRepo.save(membership);
  }

  findAll(): Promise<Membership[]> {
    return this.membershipsRepo.find();
  }
}
