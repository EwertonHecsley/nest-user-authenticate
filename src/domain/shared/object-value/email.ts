export class Email {
    private constructor(readonly value: string) {
        this.value = value;
    }

    static create(email: string): Email {
        return new Email(email);
    }

    validate(): boolean {
        return !!this.value
            .toLowerCase()
            .match(
                /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.[a-zA-Z0-9_'^&/+-]+)*@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(?:[a-zA-Z]{2,})$/
            )
    }
}