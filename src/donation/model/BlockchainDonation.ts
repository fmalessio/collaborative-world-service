import { BCBlock } from "src/blockchain/entity/bc-block.entity";
import { Donation } from "../entity/donation.entity";

export interface BlockchainDonation {
    donation: Donation;
    blockchain: BCBlock[];
}