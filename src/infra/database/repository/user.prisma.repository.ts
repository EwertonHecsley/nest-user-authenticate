import { UserRepository } from "src/domain/user/repository/user.repository";
import { PrismaService } from "../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { User } from "src/domain/user/entity/user.entity";
import { UserPrismaMapper } from "../prisma/mapper/user.prisma.mapper";

@Injectable()
export class UserPrismaRepository implements UserRepository {

    constructor(private readonly prismaService: PrismaService) { }

    async create(entity: User): Promise<User> {
        const data = UserPrismaMapper.toDatabase(entity);

        const user = await this.prismaService.user.create({ data });

        return UserPrismaMapper.toDomain(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prismaService.user.findFirst({ where: { email } });

        return user ? UserPrismaMapper.toDomain(user) : null;
    }

    async findMany(): Promise<User[]> {
        const list = await this.prismaService.user.findMany();

        return list.map(UserPrismaMapper.toDomain);
    }

    async findById(id: number): Promise<User | null> {
        const user = await this.prismaService.user.findFirst({ where: { id } });

        return user ? UserPrismaMapper.toDomain(user) : null;
    }
}