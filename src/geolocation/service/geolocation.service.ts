import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Geolocation } from 'src/geolocation/entity/geolocation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GeolocationService {

    constructor(
        @InjectRepository(Geolocation)
        private geolocationRepository: Repository<Geolocation>
    ) { }

    findOne(uuid: string): Promise<Geolocation> {
        return this.geolocationRepository.findOne(uuid);
    }
}
