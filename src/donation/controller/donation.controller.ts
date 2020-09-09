import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Donation } from '../dto/donation.class'
import { DonationService } from '../service/donation.service';

@ApiTags('Donation')
@Controller('donation')
export class DonationController {

    constructor(private readonly donationService: DonationService) { }

    @Get(':uuid')
    findOne(@Param('uuid') uuid: string): Donation {
        return this.donationService.findOne(uuid);
    }

}
