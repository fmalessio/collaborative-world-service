import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationController } from './controller/donation.controller';
import { Donation } from './entity/donation.entity';
import { DonationService } from './service/donation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Donation])
  ],
  controllers: [
    DonationController
  ],
  providers: [
    DonationService
  ]
})
export class DonationModule { }
