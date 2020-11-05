import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Geolocation } from '../entity/geolocation.entity';
import { GeolocationService } from './geolocation.service';

describe('GeolocationService', () => {
  let service: GeolocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeolocationService,
        { provide: getRepositoryToken(Geolocation), useValue: {} }
      ],
    }).compile();

    service = module.get<GeolocationService>(GeolocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
