import { HashInfraService } from "../../../infra/crypto/hash.service";
import { InMemoryTestUserRepository } from "../../../../test/repository/inMemory.user.repository";
import { EditUserUseCase } from "../use-case/edit";
import { User } from "../entity/user.entity";
import { Email } from "../../shared/object-value/email";
import { NotFoundException } from "@nestjs/common";

describe('Teste para caso de uso do dominio User', () => {
    let userRepository: InMemoryTestUserRepository;
    let hashService: HashInfraService;
    let useCase: EditUserUseCase;

    beforeEach(() => {
        userRepository = new InMemoryTestUserRepository();
        hashService = new HashInfraService();
        useCase = new EditUserUseCase(userRepository, hashService);
    });

    test('Deve editar um usuário', async () => {
        const user = User.create(
            {
                name: 'Name Test',
                email: Email.create('teste@teste.com'),
                password: await hashService.hash('123456')
            }
        )

        await userRepository.itens.push(user);

        await useCase.execute(
            {
                id: user.id.valueId,
                name: 'Name Test Editado',
                email: 'teste@teste.editado.com'
            }
        )

        expect(userRepository.itens[0].name).toBe('Name Test Editado');
        expect(userRepository.itens[0].email.value).toBe('teste@teste.editado.com');
    });

    test('Deve dar erro Not Found ao passar um ID invalido', async () => {
        //Garatindo que nao tenha um User com ID 2
        expect(userRepository.itens.find(user => user.id.valueId === 2)).toBeUndefined();

        const result = await useCase.execute({ id: 2 })

        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toBeInstanceOf(NotFoundException);
        if (result.isLeft()) {
            expect(result.value.message).toBe('User not found');
        }
    })
})