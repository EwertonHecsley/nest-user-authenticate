import { InMemoryTestUserRepository } from "../../../../test/repository/inMemory.user.repository";
import { CreateUserUseCase } from "../use-case/create";
import { HashInfraService } from "../../../infra/crypto/hash.service";
import { Email } from "../../shared/object-value/email";
import { BadRequestException } from "@nestjs/common";

describe('Teste para caso de uso do dominio User', () => {
    let userRepository: InMemoryTestUserRepository;
    let hashService: HashInfraService;
    let useCase: CreateUserUseCase;

    beforeEach(() => {
        userRepository = new InMemoryTestUserRepository();
        hashService = new HashInfraService();
        useCase = new CreateUserUseCase(userRepository, hashService);
    });

    test('Deve criar um novo usuário', async () => {
        const request = {
            name: 'Teste',
            email: 'teste@teste.com',
            password: '123456'
        };

        const response = await useCase.execute(request);

        expect(response.isRigth()).toBeTruthy();
        if (response.isRigth()) {
            expect(response.value.name).toBe(request.name);
            expect(response.value.email.value).toBe(request.email);
        }
    });

    test('Deve dar erro "BadRequest" ao passar um email existente', async () => {

        userRepository.findByEmail = jest.fn().mockResolvedValueOnce({
            id: 1,
            name: 'Teste Existente',
            email: Email.create('teste@teste.com'),
            password: 'hashedPassword'
        });

        const request = {
            name: 'Teste 2',
            email: 'teste@teste.com',
            password: 'novoPassword'
        };

        const response = await useCase.execute(request);

        expect(response.isLeft()).toBeTruthy();
        if (response.isLeft()) {
            expect(response.value.message).toBe("Email already.");
        }
        expect(response.value).toBeInstanceOf(BadRequestException);
    })

})