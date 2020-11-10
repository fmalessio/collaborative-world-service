import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoService } from 'src/shared/service/crypto.service';
import { BlockchainController } from './controller/blockchain.controller';
import { BCBlock } from './entity/bc-block.entity';
import { BlockchainService } from './service/blockchain.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([BCBlock])
    ],
    controllers: [
        BlockchainController
    ],
    providers: [
        BlockchainService,
        CryptoService
    ],
    exports: [
        BlockchainService
    ]
})
export class BlockchainModule { }
