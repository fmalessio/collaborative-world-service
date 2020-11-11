import { Injectable, Logger } from '@nestjs/common';

const CryptoJS = require("crypto-js");

@Injectable()
export class CryptoService {

    encodeSHA3(object: any): string {
        const stringfy = JSON.stringify(object).trim();
        const hash = CryptoJS.SHA3(stringfy).toString();
        console.log(`encoded: ${hash}`);
        return hash;
    }

    compareSHA3(object: any, hash: string): boolean {
        const objectHash = this.encodeSHA3(object);
        Logger.log(`Object=${JSON.stringify(object)} :: hash=${objectHash}`);
        Logger.log(`Comparing with otherHash=${hash}`);
        return objectHash === hash;
    }

}
