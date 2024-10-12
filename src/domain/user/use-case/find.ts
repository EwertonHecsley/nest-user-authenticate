import { NotFoundException } from "@nestjs/common";
import { Either, left, right } from "../errors/either.error";
import { UserRepository } from "../repository/user.repository";
import { User } from "../entity/user.entity";

type Request = {
    id: number;
}

type Response = Either<NotFoundException, User>;

export class FindUserUseCase {

    constructor(private readonly userRepository: UserRepository) { }

    async execute({ id }: Request): Promise<Response> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            return left(new NotFoundException('User not found'));
        }

        return right(user);
    }
}