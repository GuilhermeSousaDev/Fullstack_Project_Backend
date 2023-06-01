import { IBcryptProvider } from "../models/IBcryptProvider";

export default class FakeBcryptProvider implements IBcryptProvider {
    public async generateHash(payload: string): Promise<string> {
        return payload;
    }

    public async compareHash(payload: string, hash: string): Promise<boolean> {
        return payload === hash;
    }
}