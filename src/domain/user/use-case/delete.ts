import { NotFoundException } from "@nestjs/common";
import { Either, left, right } from "../errors/either.error";
import { UserRepository } from "../repository/user.repository";

type Request = {
    id: number;
}

type Response = Either<NotFoundException, boolean>;

export class DeleteUserUseCase {

    constructor(private readonly userRepository: UserRepository) { }

    async execute({ id }: Request): Promise<Response> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            return left(new NotFoundException('User not found'));
        }

        await this.userRepository.delete(id);

        return right(true);
    }
}