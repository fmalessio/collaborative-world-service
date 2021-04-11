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
    @ApiQuery({ name: 'states', isArray: true, enum: DONATION_STATE, required: false })
    findByUser(
        @Param('uuid') uuid: string,
        @Res() res: Response,
        @Query('states') states?: DONATION_STATE[]) {
        return this.donationService.findByUser(uuid, states)
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
        @Query('user') userId: string,
        @Res() res: Response) {
        return this.donationService.findNearbyDonations(lat, lng, limit, userId)
            .then((data: DonationNearby[]) => res.status(HttpStatus.OK).json(data))
            .catch(error => Promise.reject(new BadRequestException(error)));
    }

    @Post()
    create(@Body() body: Donation) {
        Logger.log(`Executing create with ${JSON.stringify(body)}}`, DonationController.name);
        return this.donationService.create(body);
    }

    @Post('/:uuid/state/:state')
    @ApiQuery({ name: 'collaborator', type: 'string', required: false })
    changeState(
        @Param('uuid') uuid: string,
        @Param('state') newState: DONATION_STATE,
        @Res() res: Response,
        @Query('collaborator') collaborator?: string) {
        Logger.log(`Executing changeState: ${uuid} -> ${newState}`, DonationController.name);
        return this.donationService.changeState(uuid, newState, collaborator)
            .then((data: Donation) => res.status(HttpStatus.OK).json(data))
            .catch(error => Promise.reject(new BadRequestException(error)));
    }

}
