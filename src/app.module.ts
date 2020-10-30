import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { CategoryModule } from './category/category.module';
import { DonationModule } from './donation/donation.module';
import { GeolocationModule } from './geolocation/geolocation.module';
import { CustomNamingStrategy } from './shared/db/CustomNamingStrategy';
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      synchronize: true,
      namingStrategy: new CustomNamingStrategy(),
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity.js'],
      logging: Boolean(process.env.DB_LOGGING)
    }),
    ConfigModule.forRoot(),
    DonationModule,
    CategoryModule,
    GeolocationModule
  ],
  controllers: [
    AppController
  ],
  providers: [
  ]
})
export class AppModule { }
