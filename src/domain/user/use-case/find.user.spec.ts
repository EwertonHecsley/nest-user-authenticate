import { InMemoryTestUserRepository } from "../../../../test/repository/inMemory.user.repository";
import { FindUserUseCase } from "../use-case/find";

describe('Teste para caso de uso do Dominio User', () => {
    let userRepository: InMemoryTestUserRepository;
    let useCase: FindUserUseCase;

    beforeEach(() => {
        userRepository = new InMemoryTestUserRepository();
        useCase = new FindUserUseCase(userRepository);
    });

    test('Deve buscar um usuário pelo id', async () => {
        userRepository.findById = jest.fn().mockResolvedValueOnce(
            {
                id: 1,
                name: 'Teste',
                email: 'teste@teste.com',
                password: '123456'
            }
        )

        const response = await useCase.execute({ id: 1 });

        expect(response.isRigth()).toBeTruthy();
        if (response.isRigth()) {
            expect(response.value.name).toBe('Teste');
            expect(response.value.email).toBe('teste@teste.com');
        }
    })

    test('Deve retornar error "Not Found" ao passar um id invalido', async () => {
        userRepository.create = jest.fn().mockResolvedValueOnce(
            {
                id: 1,
                name: 'Teste',
                email: 'teste@teste.com',
                password: '123456'
            }
        )

        const response = await useCase.execute({ id: 2 });

        expect(response.isLeft()).toBeTruthy();
        if (response.isLeft()) {
            expect(response.value.message).toBe("User not found");
        }
    })
})