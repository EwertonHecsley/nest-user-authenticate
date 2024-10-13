import { Email } from "../../shared/object-value/email";
import { InMemoryTestUserRepository } from "../../../../test/repository/inMemory.user.repository";
import { User } from "../entity/user.entity";
import { DeleteUserUseCase } from "../use-case/delete";
import { NotFoundException } from "@nestjs/common";

describe('DeleteUserUseCase', () => {
    let userRepository: InMemoryTestUserRepository;
    let useCase: DeleteUserUseCase;

    beforeEach(() => {
        userRepository = new InMemoryTestUserRepository();
        useCase = new DeleteUserUseCase(userRepository);
    });

    test('Deve excluir um usuário com sucesso', async () => {

        const user = User.create({
            name: 'Name Test',
            email: Email.create('teste@teste.com'),
            password: '123456'
        });

        await userRepository.itens.push(user);

        const result = await useCase.execute({ id: user.id.valueId });

        expect(result.isRigth()).toBeTruthy();
        expect(result.value).toBe(true);

        // Verificando se o usuário foi realmente excluído do repositório
        const userAfterDelete = userRepository.itens.find(u => u.id.valueId === user.id.valueId);
        expect(userAfterDelete).toBeUndefined();
    });

    test('Deve retornar Not Found ao tentar excluir um usuário com ID inexistente', async () => {

        expect(userRepository.itens.find(user => user.id.valueId === 99)).toBeUndefined();

        const result = await useCase.execute({ id: 99 });

        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toBeInstanceOf(NotFoundException);
        if (result.isLeft()) {
            expect(result.value.message).toBe('User not found');
        }
    });
});
