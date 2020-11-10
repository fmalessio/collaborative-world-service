import { Injectable } from '@nestjs/common';

const CryptoJS = require("crypto-js");

@Injectable()
export class CryptoService {

    encodeSHA3(object: any) {
        const stringfy = JSON.stringify(object);
        const hash = CryptoJS.SHA3(stringfy).toString();
        console.log(`encoded: ${hash}`);
        return hash;
    }

    compareSHA3(object: any, hash: string) {
        const objectHas = this.encodeSHA3(object);
        return objectHas === hash;
    }

}
