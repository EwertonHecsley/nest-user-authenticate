import Entity from "../../../core/generics/entity";
import Identity from "../../../core/generics/identity";
import { Email } from "../../shared/object-value/email";

interface IUser {
    name: string;
    email: Email;
    password: string
}

export class User extends Entity<IUser> {

    static create(data: IUser, id?: Identity): User {
        return new User({ ...data }, id);
    }

    get name(): string {
        return this.attributes.name;
    }

    get email(): Email {
        return this.attributes.email;
    }

    get password(): string {
        return this.attributes.password;
    }

    set name(value: string) {
        this.attributes.name = value;
    }

    set email(value: Email) {
        this.attributes.email = value;
    }

    set password(value: string) {
        this.attributes.password = value;
    }
}