import { User } from "../../src/domain/user/entity/user.entity";
import { UserRepository } from "../../src/domain/user/repository/user.repository";

export class InMemoryTestUserRepository implements UserRepository {
    itens: User[] = [];

    async create(entity: User): Promise<User> {
        this.itens.push(entity);

        return entity;
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.itens.find(element => element.email.value == email);

        return user;
    }

    async findMany(): Promise<User[]> {
        return this.itens;
    }
}