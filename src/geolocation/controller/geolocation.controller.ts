import { BadRequestException, Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Geolocation } from '../entity/geolocation.entity';
import { GeolocationService } from '../service/geolocation.service';

@ApiTags('Geolocation')
@Controller('geolocation')
export class GeolocationController {

    constructor(private readonly geolocationService: GeolocationService) { }

    @Get(':uuid')
    findOne(@Param('uuid') uuid: string, @Res() res: Response) {
        this.geolocationService.findOne(uuid)
            .then((data: Geolocation) => res.status(HttpStatus.OK).json(data))
            .catch(error => { return Promise.reject(new BadRequestException(error)) });
    }

}
