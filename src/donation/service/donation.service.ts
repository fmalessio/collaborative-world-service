import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from '../entity/donation.entity';

@Injectable()
export class DonationService {

    constructor(
        @InjectRepository(Donation)
        private donationRepository: Repository<Donation>
    ) { }

    findOne(uuid: string): Promise<Donation> {
        return this.donationRepository.findOne(uuid);
    }
}
