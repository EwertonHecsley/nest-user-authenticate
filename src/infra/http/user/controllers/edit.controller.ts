import { Body, Controller, HttpCode, Param, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { EditUserDto } from "src/domain/user/dto/edit.user.dto";
import { EditUserUseCase } from "src/domain/user/use-case/edit";

@Controller('user')
export class EditUseController {

    constructor(private readonly userService: EditUserUseCase) { }

    @Put(':id')
    @HttpCode(204)
    async handler(@Body() data: EditUserDto, @Param('id') id: string, @Res() response: Response) {
        const result = await this.userService.execute({ id: parseInt(id), ...data });

        if (result.isLeft()) {
            throw result.value;
        }

        return response.send();
    }
}