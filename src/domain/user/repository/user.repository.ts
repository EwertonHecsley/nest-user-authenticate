import { User } from "../entity/user.entity";

export abstract class UserRepository {
    abstract create(entity: User): Promise<User>;
    abstract findByEmail(email: string): Promise<User>;
    abstract findMany(): Promise<User[]>;
    abstract findById(id: number): Promise<User>;
}