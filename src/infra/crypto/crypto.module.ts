import { Module } from "@nestjs/common";
import { HashService } from "src/domain/user/service/hash.service";
import { HashInfraService } from "./hash.service";

@Module({
    providers: [
        { provide: HashService, useClass: HashInfraService }
    ],
    exports: [HashService]
})
export class CryptoModule { }