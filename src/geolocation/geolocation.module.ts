import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeolocationController } from './controller/geolocation.controller';
import { Geolocation } from './entity/geolocation.entity';
import { GeolocationService } from './service/geolocation.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Geolocation])
    ],
    controllers: [
        GeolocationController
    ],
    providers: [
        GeolocationService
    ]
})
export class GeolocationModule { }
