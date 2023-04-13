import { compare, hash } from "bcryptjs";
import { IBcryptProvider } from "../models/IBcryptProvider";

export default class BcryptProvider implements IBcryptProvider {
    public async generateHash(payload: string): Promise<string> {
        return await hash(payload, 8);
    }

    public async compareHash(payload: string, hash: string): Promise<boolean> {
        return await compare(payload, hash);
    }
}