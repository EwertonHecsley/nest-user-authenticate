import { Controller, Delete, HttpCode, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { DeleteUserUseCase } from "src/domain/user/use-case/delete";

@Controller('user')
export class DeleteUserController {

    constructor(private readonly userService: DeleteUserUseCase) { }

    @Delete(':id')
    @HttpCode(204)
    async handler(@Param('id') id: string, @Res() response: Response) {
        const user = await this.userService.execute({ id: parseInt(id) });

        if (!user) {
            throw user.value;
        }

        return response.send();
    }
}