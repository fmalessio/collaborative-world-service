import { Test, TestingModule } from '@nestjs/testing';
import { DonationService } from '../service/donation.service';
import { DonationController } from './donation.controller';

describe('DonationController', () => {
  let controller: DonationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonationController],
      providers: [
        { provide: DonationService, useValue: {} },
      ]
    }).compile();

    controller = module.get<DonationController>(DonationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
