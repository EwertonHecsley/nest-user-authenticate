import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Either, left, right } from "../errors/either.error";
import { UserRepository } from "../repository/user.repository";
import { HashService } from "../service/hash.service";
import { TokenService } from "../service/token.service";
import { User } from "../entity/user.entity";

type Request = {
    email: string;
    password: string;
}

type Response = Either<BadRequestException | NotFoundException | UnauthorizedException, { token: string, user: User }>;

export class AuthUserUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashService: HashService,
        private readonly tokenService: TokenService
    ) { }

    async execute({ email, password }: Request): Promise<Response> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            return left(new UnauthorizedException('Invalid Email'));
        }

        const isPasswordValid = await this.hashService.compare(password, user.password);

        if (!isPasswordValid) {
            return left(new UnauthorizedException('Invalid Password'));
        }

        const token = await this.tokenService.generate({ userId: user.id.valueId, userEmail: user.email.value });

        return right({ token, user });
    }
}