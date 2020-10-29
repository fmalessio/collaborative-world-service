import { Test, TestingModule } from '@nestjs/testing';
import { GeolocationService } from './donation.service';

describe('DonationService', () => {
  let service: GeolocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeolocationService],
    }).compile();

    service = module.get<GeolocationService>(GeolocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
