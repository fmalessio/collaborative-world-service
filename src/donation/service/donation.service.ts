import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DONATION_STATE } from '../../shared/constant/enum.const';
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

    save(donation: Donation): Promise<Donation> {
        if (!donation.follow) {
            donation.state = DONATION_STATE.READY_TO_TRAVEL;
        }
        return this.donationRepository.save(donation);
    }
}
