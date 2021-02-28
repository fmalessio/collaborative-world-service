import {
    BadRequestException,
    Body, Controller, Get,
    HttpStatus, Logger, Param, Post, Put, Query, Res
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DONATION_STATE } from 'src/shared/constant/enum.const';
import { Donation } from '../entity/donation.entity';
import { DonationNearby } from '../model/DonationNearby';
import { DonationService } from '../service/donation.service';

@ApiTags('Donation')
@ApiBearerAuth()
@Controller('donation')
export class DonationController {

    constructor(private readonly donationService: DonationService) { }

    @Get(':uuid')
    findOne(@Param('uuid') uuid: string, @Res() res: Response) {
        return this.donationService.findOne(uuid)
            .then((data: Donation) => res.status(HttpStatus.OK).json(data))
            .catch(error => Promise.reject(new BadRequestException(error)));
    }

    @Get('user/:uuid')
    findByUser(@Param('uuid') uuid: string, @Res() res: Response) {
        return this.donationService.findByUser(uuid)
            .then((data: Donation[]) => res.status(HttpStatus.OK).json(data))
            .catch(error => Promise.reject(new BadRequestException(error)));
    }

    @Get('search/nearby')
    @ApiQuery({ name: 'lat', type: 'number' })
    @ApiQuery({ name: 'lng', type: 'number' })
    @ApiQuery({ name: 'limit', type: 'number' })
    nearbyDonations(
        @Query('lat') lat: number,
        @Query('lng') lng: number,
        @Query('limit') limit: number,
        @Res() res: Response) {
        return this.donationService.findNearbyDonations(lat, lng, limit)
            .then((data: DonationNearby[]) => res.status(HttpStatus.OK).json(data))
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
