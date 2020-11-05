import { Module } from '@nestjs/common';
import { NotificationController } from './controller/notification.controller';
import { NotificationService } from './service/notification.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule { }
