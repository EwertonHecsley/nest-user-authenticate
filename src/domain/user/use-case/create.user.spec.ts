import { InMemoryTestUserRepository } from "../../../../test/repository/inMemory.user.repository";
import { CreateUserUseCase } from "../use-case/create";
import { HashInfraService } from "../../../infra/crypto/hash.service";
import { User } from "../entity/user.entity";
import { Email } from "../../shared/object-value/email";

describe('Teste para caso de uso do dominio User', () => {
    let userRepository: InMemoryTestUserRepository;
    let hashService: HashInfraService;
    let useCase: CreateUserUseCase;

    beforeEach(() => {
        userRepository = new InMemoryTestUserRepository();
        hashService = new HashInfraService();
        useCase = new CreateUserUseCase(userRepository, hashService);
    });

    test('Deve criar um novo usuario', async () => {
        const request = {
            name: 'Teste',
            email: 'teste@teste.com',
            password: '123456'
        };

        const user = User.create(
            {
                name: request.name,
                email: Email.create(request.email),
                password: await hashService.hash(request.password)
            }
        );

        const response = await useCase.execute(
            {
                name: user.name,
                email: user.email.value,
                password: user.password
            }
        );

        expect(response.isRigth()).toBeTruthy();

    })
})