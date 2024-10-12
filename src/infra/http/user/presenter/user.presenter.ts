import { User } from "src/domain/user/entity/user.entity";

export class UserPrismaPresenter {

    static toHTTP(entity: User) {
        return {
            id: entity.id.valueId,
            name: entity.name,
            email: entity.email.value,
        }
    }
}