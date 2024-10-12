import { BadRequestException } from "@nestjs/common";
import { User } from "../entity/user.entity";
import { Either, left, right } from "../errors/either.error";
import { UserRepository } from "../repository/user.repository";
import { HashService } from "../service/hash.service";
import { Email } from "../../shared/object-value/email";

type Request = {
    name: string;
    email: string;
    password: string;
}

type Response = Either<BadRequestException, User>

export class CreateUserUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashService: HashService
    ) { }

    async execute({ name, email, password }: Request): Promise<Response> {

        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            return left(new BadRequestException("Email already."))
        }

        const objectEmail = Email.create(email);

        if (!objectEmail.validate()) {
            return left(new BadRequestException("Invalid email."))
        }

        const hashedPassword = await this.hashService.hash(password);

        const user = User.create(
            {
                name,
                email: objectEmail,
                password: hashedPassword
            }
        )

        return right(user);
    }
}