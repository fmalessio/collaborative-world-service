import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { BlockchainService } from '../service/blockchain.service';

@ApiTags('Blockchain')
@Controller('blockchain')
export class BlockchainController {

    constructor(
        private blockchainService: BlockchainService
    ) { }

    @Get('donation/:id')
    @ApiParam({ name: 'id', type: 'string' })
    getBlockchainInfo(@Param() params) {
        return this.blockchainService.findAllByDonationId(params.id);
    }

}
