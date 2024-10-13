import { JwtService } from "@nestjs/jwt";
import { TokenService } from "src/domain/user/service/token.service";

export class TokenInfraService implements TokenService {

    constructor(private readonly jwtService: JwtService) { }

    generate(value: Record<string, unknown>): string {
        return this.jwtService.sign(value);
    }
}