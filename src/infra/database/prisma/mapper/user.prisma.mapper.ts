import { User as UserDatabase } from "@prisma/client";
import Identity from "src/core/generics/identity";
import { Email } from "src/domain/shared/object-value/email";
import { User } from "src/domain/user/entity/user.entity";

export class UserPrismaMapper {

    static toDatabase(entity: User): UserDatabase {
        return {
            id: entity.id.valueId,
            name: entity.name,
            email: entity.email.value,
            password: entity.password,
        }
    }

    static toDomain(entity: UserDatabase): User {
        return User.create(
            {
                name: entity.name,
                email: Email.create(entity.email),
                password: entity.password
            },
            new Identity(entity.id)
        )
    }
}