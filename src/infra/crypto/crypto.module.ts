import { Module } from "@nestjs/common";
import { HashService } from "src/domain/user/service/hash.service";
import { HashInfraService } from "./hash.service";
import { TokenService } from "src/domain/user/service/token.service";
import { TokenInfraService } from "./token.service";

@Module({
    providers: [
        { provide: HashService, useClass: HashInfraService },
        { provide: TokenService, useClass: TokenInfraService }
    ],
    exports: [HashService, TokenService]
})
export class CryptoModule { }