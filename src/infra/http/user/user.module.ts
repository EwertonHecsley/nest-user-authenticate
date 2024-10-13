import { Module } from "@nestjs/common";
import { UserRepository } from "src/domain/user/repository/user.repository";
import { HashService } from "src/domain/user/service/hash.service";
import { CreateUserUseCase } from "src/domain/user/use-case/create";
import { CryptoModule } from "src/infra/crypto/crypto.module";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateUserController } from "./controllers/create.controller";
import { ListUserUseCase } from "src/domain/user/use-case/list";
import { ListUserController } from "./controllers/list.controller";
import { FindUserUseCase } from "src/domain/user/use-case/find";
import { FindUseController } from "./controllers/find.controller";
import { EditUserUseCase } from "src/domain/user/use-case/edit";
import { EditUseController } from "./controllers/edit.controller";
import { DeleteUserUseCase } from "src/domain/user/use-case/delete";
import { DeleteUserController } from "./controllers/delete.controller";
import { AuthUserUseCase } from "src/domain/user/use-case/auth";
import { TokenService } from "src/domain/user/service/token.service";
import { LoginController } from "./controllers/login.controller";

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
        },
        {
            provide: FindUserUseCase,
            useFactory: (userRepository: UserRepository) => {
                return new FindUserUseCase(userRepository);
            },
            inject: [UserRepository]
        },
        {
            provide: EditUserUseCase,
            useFactory: (userRepository: UserRepository, hashService: HashService) => {
                return new EditUserUseCase(userRepository, hashService);
            },
            inject: [UserRepository, HashService]
        },
        {
            provide: DeleteUserUseCase,
            useFactory: (userRepository: UserRepository) => {
                return new DeleteUserUseCase(userRepository);
            },
            inject: [UserRepository]
        },
        {
            provide: AuthUserUseCase,
            useFactory: (userRepository: UserRepository, hashService: HashService, tokenService: TokenService) => {
                return new AuthUserUseCase(userRepository, hashService, tokenService);
            },
            inject: [UserRepository, HashService, TokenService]
        }
    ],
    controllers: [CreateUserController, ListUserController, FindUseController, EditUseController, DeleteUserController, LoginController]
})
export class UserModule { }