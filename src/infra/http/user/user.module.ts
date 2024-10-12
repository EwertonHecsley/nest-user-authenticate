import { Module } from "@nestjs/common";
import { UserRepository } from "src/domain/user/repository/user.repository";
import { HashService } from "src/domain/user/service/hash.service";
import { CreateUserUseCase } from "src/domain/user/use-case/create";
import { CryptoModule } from "src/infra/crypto/crypto.module";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateUserController } from "./controllers/create.controller";
import { ListUserUseCase } from "src/domain/user/use-case/list";
import { ListUserController } from "./controllers/list.controller";

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
        },
        {
            provide: ListUserUseCase,
            useFactory: (userRepository: UserRepository) => {
                return new ListUserUseCase(userRepository);
            },
            inject: [UserRepository]
        }
    ],
    controllers: [CreateUserController, ListUserController]
})
export class UserModule { }