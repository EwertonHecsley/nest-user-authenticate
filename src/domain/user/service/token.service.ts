export abstract class TokenService {
    abstract generate(value: Record<string, unknown>): string;
}