import { Injectable } from '@nestjs/common';

@Injectable()
export class DonationService {
    
    findOne(uuid: string): any {
        throw new Error("Method not implemented.");
    }
}
