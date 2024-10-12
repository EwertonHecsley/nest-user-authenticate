import { randomInt } from "crypto";

export default class Identity {
    private value: number;

    constructor(value?: number) {
        this.value = value ?? randomInt(3);
    }

    get valueId(): number {
        return this.value;
    }
}


