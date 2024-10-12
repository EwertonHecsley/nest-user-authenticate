import { HashService } from "src/domain/user/service/hash.service";
import { hash, compare } from "bcrypt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HashInfraService implements HashService {

    async hash(value: string): Promise<string> {
        return await hash(value, 10);
    }

    async compare(value: string, hash: string): Promise<boolean> {
        return compare(value, hash);
    }
}