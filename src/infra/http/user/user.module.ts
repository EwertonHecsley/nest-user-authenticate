import { Module } from "@nestjs/common";
import { UserRepository } from "src/domain/user/repository/user.repository";
import { HashService } from "src/domain/user/service/hash.service";
import { CreateUserUseCase } from "src/domain/user/use-case/create";
import { CryptoModule } from "src/infra/crypto/crypto.module";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateUserController } from "./controllers/create.controller";

@Module({
    imports: [
        DatabaseModule, CryptoModule
    ],
    providers: [
        {
            provide: CreateUserUseCase,
            useFactory: (userRepository: UserRepository, hashService: HashService) => {
                return new CreateUserUseCase(userRepository, hashService);
            },
            inject: [UserRepository, HashService]
        }
    ],
    controllers: [CreateUserController]
})
export class UserModule { }