import { Email } from "../../shared/object-value/email";
import { UserRepository } from "../repository/user.repository";
import { Either, left, right } from "../errors/either.error";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { HashService } from "../service/hash.service";

type Request = {
    id: number;
    name?: string;
    email?: string;
    password?: string;
}

type Response = Either<BadRequestException | NotFoundException, boolean>;

export class EditUserUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashService: HashService
    ) { }

    async execute(data: Request): Promise<Response> {
        const user = await this.userRepository.findById(data.id);

        if (!user) {
            return left(new NotFoundException('User not found'));
        }

        if (data.email) {
            const emailExist = await this.userRepository.findByEmail(data.email);

            if (emailExist) {
                return left(new BadRequestException('Email already in use'));
            }

            user.email = Email.create(data.email);

            if (!user.email.validate()) {
                return left(new BadRequestException('Invalid email format'));
            }
        }

        if (data.name) user.name = data.name;

        if (data.password) {
            const hashedPassword = await this.hashService.hash(data.password);
            user.password = hashedPassword;
        }

        await this.userRepository.save(user);

        return right(true);
    }
}