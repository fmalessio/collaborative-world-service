import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DonationTransaction } from 'src/donation/entity/donation-transaction.entity';
import { CryptoService } from 'src/shared/service/crypto.service';
import { Repository } from 'typeorm';
import { BCBlock } from '../entity/bc-block.entity';

@Injectable()
export class BlockchainService {

    constructor(
        @InjectRepository(BCBlock)
        private blockchainRepository: Repository<BCBlock>,
        private cryptoService: CryptoService
    ) { }

    create(object: any, donationId: string): void {
        this.saveNewBlock(object, null, donationId);
    }

    findAllByDonationId(donationId: string): Promise<BCBlock[]> {
        return this.blockchainRepository.find({ 
            where: { donation: donationId },
            order: { createdDate: "ASC" }
        });
    }

    addBlock(blockchain: BCBlock[], newTx: DonationTransaction, uuid: string) {
        const lastBlok: BCBlock = blockchain[blockchain.length - 1];
        const newTxBlock: any = {
            uuid: newTx.uuid,
            generation_date: newTx.generationDate,
            state: newTx.state
        };
        this.saveNewBlock(newTxBlock, lastBlok.hash, uuid).then((newBlockSaved: BCBlock) => {
            lastBlok.nextHash = newBlockSaved.hash;
            this.blockchainRepository.save(lastBlok);
        });
    }

    compare(object: any, hash: string): boolean {
        return this.cryptoService.compareSHA3(object, hash);
    }

    private saveNewBlock(object: any, previousHash: string, donationId: string): Promise<BCBlock> {
        let block: BCBlock = new BCBlock();
        block.donation.uuid = donationId;
        block.previousHash = previousHash;
        block.hash = this.cryptoService.encodeSHA3(object);
        Logger.log(`object=${JSON.stringify(object)} :: hash=${block.hash}`);
        return this.blockchainRepository.save(block);
    }
}
