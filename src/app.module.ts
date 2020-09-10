import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonationModule } from './donation/donation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '0.0.0.0',
      port: 5432,
      username: 'postgres',
      password: 'umcwdb',
      database: 'collaborative_world',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    DonationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
