import { BadRequestException, Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Donation } from '../dto/donation.class';
import { DonationService } from '../service/donation.service';

@ApiTags('Donation')
@Controller('donation')
export class DonationController {

    constructor(private readonly donationService: DonationService) { }

    @Get(':uuid')
    findOne(@Param('uuid') uuid: string, @Res() res: Response) {
        this.donationService.findOne(uuid)
            .then((data: Donation) => res.status(HttpStatus.OK).json(data))
            .catch(error => { return Promise.reject(new BadRequestException(error)) });
    }

}
