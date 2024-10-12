import { Email } from "../../shared/object-value/email";
import { InMemoryTestUserRepository } from "../../../../test/repository/inMemory.user.repository";
import { User } from "../entity/user.entity";
import { ListUserUseCase } from "../use-case/list";

describe('Teste para caso de uso dominio User', () => {

    let userRepository: InMemoryTestUserRepository;
    let useCase: ListUserUseCase;

    beforeEach(() => {
        userRepository = new InMemoryTestUserRepository();
        useCase = new ListUserUseCase(userRepository);
    });

    test('Deve listar todos os usuários', async () => {
        const user = User.create(
            {
                name: 'Nome Teste',
                email: Email.create('teste@teste.com'),
                password: '123456'
            }
        )

        userRepository.itens.push(user);

        const response = await useCase.execute();

        expect(response.isRigth()).toBeTruthy();
        expect(response.value).toHaveLength(1);
    })
})