import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Geolocation } from '../entity/geolocation.entity';

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
