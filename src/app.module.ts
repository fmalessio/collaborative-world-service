import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonationModule } from './donation/donation.module';

@Module({
  imports: [DonationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
