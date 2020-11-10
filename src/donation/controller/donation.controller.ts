import {
    BadRequestException,
    Body, Controller, Get,
    HttpStatus, Logger, Param, Post, Res
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Donation } from '../entity/donation.entity';
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

    @Post()
    create(@Body() body: Donation) {
        Logger.log(`Executing create with ${JSON.stringify(body)}}`, DonationController.name);
        return this.donationService.create(body);
    }

}
