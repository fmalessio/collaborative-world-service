import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockchainService } from 'src/blockchain/service/blockchain.service';
import { Repository } from 'typeorm';
import { DONATION_STATE } from '../../shared/constant/enum.const';
import { DonationTransaction } from '../entity/donation-transaction.entity';
import { Donation } from '../entity/donation.entity';

@Injectable()
export class DonationService {

    constructor(
        @InjectRepository(Donation)
        private donationRepository: Repository<Donation>,
        private blockchainService: BlockchainService
    ) { }

    findOne(uuid: string): Promise<Donation> {
        return this.donationRepository.findOne(uuid);
    }

    create(donation: Donation): Promise<Donation> {
        if (!donation.follow) {
            donation.state = DONATION_STATE.READY_TO_TRAVEL;
        }
        donation.transactions = [];
        let tx: DonationTransaction = new DonationTransaction();
        tx.state = donation.state;
        donation.transactions.push(tx);
        return this.donationRepository.save(donation).then(result => {
            this.blockchainService.create(tx, result.uuid);
            return result;
        });
    }
}
