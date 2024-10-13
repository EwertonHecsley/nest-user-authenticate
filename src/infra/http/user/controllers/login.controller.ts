import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthDto } from "src/domain/user/dto/auth.dto";
import { AuthUserUseCase } from "src/domain/user/use-case/auth";
import { UserPrismaPresenter } from "../presenter/user.presenter";

@Controller('login')
export class LoginController {

    constructor(private readonly authService: AuthUserUseCase) { }

    @Post()
    @HttpCode(200)
    async handler(@Body() data: AuthDto, @Res() response: Response) {
        const result = await this.authService.execute(data);

        if (result.isLeft()) {
            throw result.value;
        }

        const { token, user } = result.value;

        return response.json(
            {
                user: UserPrismaPresenter.toHTTP(user),
                token
            }
        )
    }
}