import { Controller, Get, HttpCode, InternalServerErrorException, Res } from "@nestjs/common";
import { Response } from "express";
import { ListUserUseCase } from "src/domain/user/use-case/list";
import { UserPrismaPresenter } from "../presenter/user.presenter";

@Controller('user')
export class ListUserController {

    constructor(private readonly userService: ListUserUseCase) { }

    @Get()
    @HttpCode(200)
    async handler(@Res() response: Response) {
        const list = await this.userService.execute();

        if (list.isLeft()) {
            throw new InternalServerErrorException();
        }

        const result = list.value.map(element => UserPrismaPresenter.toHTTP(element));

        return response.json(result);
    }
}