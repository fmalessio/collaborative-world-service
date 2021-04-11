import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BCBlock } from 'src/blockchain/entity/bc-block.entity';
import { BlockchainService } from 'src/blockchain/service/blockchain.service';
import { User } from 'src/user/entity/user.entity';
import { getManager, Repository } from 'typeorm';
import { DONATION_STATE, DONATION_STATE_TRANSACTIONS } from '../../shared/constant/enum.const';
import { DonationTransaction } from '../entity/donation-transaction.entity';
import { Donation } from '../entity/donation.entity';
import { BlockchainDonation } from '../model/BlockchainDonation';
import { DonationNearby } from '../model/DonationNearby';

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

    findByUser(uuid: string, states?: DONATION_STATE[]): Promise<Donation[]> {
        if (states) {
            return this.findByUserAndStates(uuid, states);
        }
        return this.findByUserUuid(uuid);
    }

    async findNearbyDonations(
        lat: number,
        lng: number,
        metersLimit: number,
        userId: string): Promise<DonationNearby[]> {
        const entityManager = getManager();
        const rawData: DonationNearby[] = await entityManager.query(
            `SELECT
            don.uuid AS uuid,
            don.amount,
            cat.name AS category_name,
            geo.address AS address,
            geo.lat AS lat,
            geo.lng AS lng,
            earth_distance(ll_to_earth($1, $2), ll_to_earth(geo.lat, geo.lng)) AS distance
            FROM 
            donation don
            inner join geolocation geo on don.geolocation_id = geo.uuid
            inner join box box on don.box_id = box.uuid
            inner join category cat on box.category_id = cat.id
            WHERE 
            don.state = $4
            AND don.user_id != $5
            AND earth_box(ll_to_earth($1, $2), $3) @> ll_to_earth(geo.lat, geo.lng) 
            AND earth_distance(ll_to_earth($1, $2), ll_to_earth(geo.lat, geo.lng)) < $3
            ORDER BY distance ASC`,
            [lat, lng, metersLimit, DONATION_STATE.READY_TO_TRAVEL, userId]);
        return rawData;
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
            const txSaved = {
                uuid: result.transactions[0].uuid,
                generation_date: result.transactions[0].generationDate,
                state: result.transactions[0].state
            };
            this.blockchainService.create(txSaved, result.uuid);
            return result;
        });
    }

    changeState(uuid: string, newState: DONATION_STATE, collaborator?: string): Promise<Donation | string> {
        return this.changeStateValid(uuid, newState)
            .then((result: BlockchainDonation) => {
                result.donation.state = newState;
                let newTx: DonationTransaction = new DonationTransaction();
                newTx.state = newState;
                if (collaborator) {
                    let coll: User = new User();
                    coll.uuid = collaborator;
                    newTx.collaborator = coll;
                }
                result.donation.transactions.push(newTx);
                return this.donationRepository.save(result.donation).then(donationResult => {
                    const lastTx = donationResult.transactions[donationResult.transactions.length - 1];
                    this.blockchainService.addBlock(result.blockchain, lastTx, donationResult.uuid);
                    return donationResult;
                });
            })
            .catch(error => Promise.reject(error));
    }

    private changeStateValid(uuid: string, newState: DONATION_STATE): Promise<BlockchainDonation | string> {
        let promises: Promise<any>[] = [];
        promises.push(this.findOne(uuid));
        promises.push(this.blockchainService.findAllByDonationId(uuid));
        return Promise.all(promises).then(values => {
            if (!values || !values[0]) {
                return Promise.reject('Error en la búsqueda de información');
            }
            const donation: Donation = values[0];
            const blockchain: BCBlock[] = values[1];

            if (!DONATION_STATE_TRANSACTIONS[donation.state].includes(newState)) {
                return Promise.reject('Error en los estados de la donación (Code A)');
            }
            const lastTx: DonationTransaction = donation.transactions[donation.transactions.length - 1];
            if (lastTx.state !== donation.state) {
                return Promise.reject('Error en los estados de la donación (Code B)');
            }
            const lastBCBlock: BCBlock = blockchain[blockchain.length - 1];
            if (!this.blockchainService.compare(
                { uuid: lastTx.uuid, generation_date: lastTx.generationDate, state: lastTx.state },
                lastBCBlock.hash)) {
                return Promise.reject('Error en los estados de la donación (Code C)');
            }
            return Promise.resolve({ donation: donation, blockchain: blockchain });
        });
    }

    private findByUserUuid(uuid: string): Promise<Donation[]> {
        return this.donationRepository.find({
            where: { user: { uuid: uuid } },
            order: { startDate: "DESC" }
        }).then(data => data);
    }

    private findByUserAndStates(uuid: string, states: DONATION_STATE[]): Promise<Donation[]> {
        return this.donationRepository.createQueryBuilder('don')
            .innerJoin('don.user', 'user')
            .innerJoinAndSelect('don.box', 'box')
            .innerJoinAndSelect('box.category', 'category')
            .innerJoinAndSelect('don.geolocation', 'geolocation')
            .innerJoinAndSelect('don.transactions', 'transactions')
            .where(
                'user.uuid = :uuid and don.state IN (:states)',
                { uuid: uuid, states: states }
            )
            .getMany();
    }
}
