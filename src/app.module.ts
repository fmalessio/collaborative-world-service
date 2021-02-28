import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { BlockchainModule } from './blockchain/blockchain.module';
import { CategoryModule } from './category/category.module';
import { DonationModule } from './donation/donation.module';
import { GeolocationModule } from './geolocation/geolocation.module';
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';
require('dotenv').config();

export const GetTypeOrmConfig = (): any => {
  const config = {
    type: 'postgres',
    synchronize: true,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/*.entity.js'],
    logging: Boolean(process.env.DB_LOGGING),
  };
  if (process.env.DB_SSL === undefined) {
    return {
      ...config,
      ssl: Boolean(process.env.DB_SSL) || true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    };
  }
  return config;
}

@Module({
  imports: [
    TypeOrmModule.forRoot(GetTypeOrmConfig()),
    ConfigModule.forRoot(),
    DonationModule,
    CategoryModule,
    GeolocationModule,
    UserModule,
    NotificationModule,
    BlockchainModule,
    AuthModule
  ],
  controllers: [
    AppController
  ],
  providers: []
})
export class AppModule { }