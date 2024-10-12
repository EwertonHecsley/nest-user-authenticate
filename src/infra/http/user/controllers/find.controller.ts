import { Controller, Get, HttpCode, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { FindUserUseCase } from "src/domain/user/use-case/find";
import { UserPrismaPresenter } from "../presenter/user.presenter";

@Controller('user')
export class FindUseController {

    constructor(private readonly userService: FindUserUseCase) { }

    @Get(':id')
    @HttpCode(200)
    async handler(@Param('id') id: string, @Res() response: Response) {
        const user = await this.userService.execute({ id: parseInt(id) });

        if (user.isLeft()) {
            throw user.value;
        }

        return response.json(UserPrismaPresenter.toHTTP(user.value));
    }
}