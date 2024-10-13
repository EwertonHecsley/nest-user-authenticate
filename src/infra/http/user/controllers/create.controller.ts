import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { UserDto } from "src/domain/user/dto/user.dto";
import { CreateUserUseCase } from "src/domain/user/use-case/create";
import { UserPrismaPresenter } from "../presenter/user.presenter";
import { Public } from "src/infra/auth/public";

@Controller('user')
export class CreateUserController {

    constructor(
        private readonly userService: CreateUserUseCase) { }

    @Public()
    @Post()
    @HttpCode(201)
    async handler(@Body() data: UserDto, @Res() response: Response) {
        const user = await this.userService.execute({ ...data });

        if (user.isLeft()) {
            throw user.value;
        }

        return response.json(UserPrismaPresenter.toHTTP(user.value))
    }
}