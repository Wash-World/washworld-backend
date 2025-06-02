// src/help/help.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { HelpService } from './help.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MembershipGuard } from '../auth/membership.guard';

@Controller('api/help')
export class HelpController {
  constructor(private readonly helpService: HelpService) {}

  @Get()
  @UseGuards(JwtAuthGuard, MembershipGuard)
  getHelp() {
    return this.helpService.getHelpContent();
  }
}
