import {
    BadRequestException,
    Body, Controller, Get,
    HttpStatus, Logger, Param, Post, Put, Res
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DONATION_STATE } from 'src/shared/constant/enum.const';
import { Donation } from '../entity/donation.entity';
import { DonationService } from '../service/donation.service';

@ApiTags('Donation')
@Controller('donation')
export class DonationController {

    constructor(private readonly donationService: DonationService) { }

    @Get(':uuid')
    findOne(@Param('uuid') uuid: string, @Res() res: Response) {
        return this.donationService.findOne(uuid)
            .then((data: Donation) => res.status(HttpStatus.OK).json(data))
            .catch(error => Promise.reject(new BadRequestException(error)));
    }

    @Post()
    create(@Body() body: Donation) {
        Logger.log(`Executing create with ${JSON.stringify(body)}}`, DonationController.name);
        return this.donationService.create(body);
    }

    @Put('/:uuid/state/:state')
    changeState(
        @Param('uuid') uuid: string,
        @Param('state') newState: DONATION_STATE,
        @Res() res: Response) {
        Logger.log(`Executing changeState: ${uuid} -> ${newState}`, DonationController.name);
        return this.donationService.changeState(uuid, newState)
            .then(
                () => res.status(HttpStatus.OK).json(),
                (error: string) => Promise.reject(new BadRequestException(error))
            ).catch(error => Promise.reject(new BadRequestException(error)));
    }

}
