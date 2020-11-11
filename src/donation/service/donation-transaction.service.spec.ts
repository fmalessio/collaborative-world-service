import { Test, TestingModule } from '@nestjs/testing';
import { DonationTransactionService } from './donation-transaction.service';

describe('DonationTransactionService', () => {
  let service: DonationTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonationTransactionService],
    }).compile();

    service = module.get<DonationTransactionService>(DonationTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
