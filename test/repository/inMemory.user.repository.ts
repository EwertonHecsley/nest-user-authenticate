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

    async findById(id: number): Promise<User> {
        const user = this.itens.find(element => element.id.valueId == id);

        return user;
    }

    async save(entity: User): Promise<void> {
        const itemExist = this.itens.findIndex(element => element.id.valueId == entity.id.valueId);

        this.itens[itemExist] = entity;
    }

    async delete(id: number): Promise<void> {
        const itemExist = this.itens.findIndex(element => element.id.valueId == id);

        if (itemExist > -1) {
            this.itens.splice(itemExist, 1);
        }
    }
}