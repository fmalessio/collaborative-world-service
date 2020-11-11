import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BCBlock } from 'src/blockchain/entity/bc-block.entity';
import { BlockchainService } from 'src/blockchain/service/blockchain.service';
import { Repository } from 'typeorm';
import { DONATION_STATE } from '../../shared/constant/enum.const';
import { DonationTransaction } from '../entity/donation-transaction.entity';
import { Donation } from '../entity/donation.entity';
import { DonationTransactionService } from './donation-transaction.service';

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

    changeState(uuid: string, newState: DONATION_STATE): Promise<boolean|string> {
        return this.changeStateValid(uuid, newState)
            .catch(error => Promise.reject(error));
    }

    private changeStateValid(uuid: string, newState: DONATION_STATE): Promise<boolean|string> {
        let promises: Promise<any>[] = [];
        promises.push(this.findOne(uuid));
        promises.push(this.blockchainService.findAllByDonationId(uuid));
        return Promise.all(promises).then(values => {
            if (!values || !values[0] || !values[1]) {
                return Promise.reject('Error en la búsqueda de información');
            }
            const donation: Donation = values[0];
            const blockchain: BCBlock = values[1];
            // TODO: validations
            return Promise.resolve(true);
        });
    }
}
