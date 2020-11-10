import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from 'src/donation/entity/donation.entity';
import { CryptoService } from 'src/shared/service/crypto.service';
import { Repository } from 'typeorm';
import { BCBlock } from '../entity/bc-block.entity';

@Injectable()
export class BlockchainService {

    constructor(
        @InjectRepository(BCBlock)
        private donationRepository: Repository<BCBlock>,
        private cryptoService: CryptoService
    ) { }

    create(object: any, donationId: string): void {
        let block: BCBlock = new BCBlock();
        block.donation = new Donation();
        block.donation.uuid = donationId;
        block.hash = this.cryptoService.encodeSHA3(object);
        this.donationRepository.save(block);
    }

    findAllByDonationId(donationId: string): Promise<BCBlock[]> {
        let BCBlockSearch: BCBlock = new BCBlock();
        BCBlockSearch.donation = new Donation();
        BCBlockSearch.donation.uuid = donationId;
        return this.donationRepository.find(BCBlockSearch);
    }
}
