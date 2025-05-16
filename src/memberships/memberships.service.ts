// src/memberships/memberships.service.ts
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
    let services: Service[] = [];

    // Only fetch services if the DTO provided any IDs
    if (dto.serviceIds && dto.serviceIds.length) {
      services = await this.servicesRepo.find({
        where: { service_id: In(dto.serviceIds) },
      });

      // If any ID didn’t match, throw
      if (services.length !== dto.serviceIds.length) {
        throw new NotFoundException('One or more services not found');
      }
    }

    // Create & save—`services` will be an empty array if none provided
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
