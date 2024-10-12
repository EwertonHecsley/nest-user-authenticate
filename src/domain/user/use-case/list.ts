import { User } from "../entity/user.entity";
import { Either, left, right } from "../errors/either.error";
import { UserRepository } from "../repository/user.repository";

type Response = Either<null, User[]>;

export class ListUserUseCase {

    constructor(private readonly userRepository: UserRepository) { }

    async execute(): Promise<Response> {
        const list = await this.userRepository.findMany();

        if (list.length == 0) {
            return left(null);
        }

        return right(list);
    }
}