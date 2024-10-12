import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { UserRepository } from "src/domain/user/repository/user.repository";
import { UserPrismaRepository } from "../repository/user.prisma.repository";

@Module({
    providers: [
        PrismaService,
        {
            provide: UserRepository, useClass: UserPrismaRepository
        }
    ],
    exports: [PrismaService, UserRepository]
})
export class PrismaModule { }