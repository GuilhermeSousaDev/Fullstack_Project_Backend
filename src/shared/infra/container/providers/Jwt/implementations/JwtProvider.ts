import { JwtPayload, sign, verify } from "jsonwebtoken";
import { ICreateToken } from "../models/ICreateToken";
import { IJwtProvider } from "../models/IJwtProvider";
import { secret } from '../../../../../../config/secret';

export default class JwtProvider implements IJwtProvider {
    public generateToken({ id, name, email }: ICreateToken): string {
        return sign({ id, name, email }, secret, { expiresIn: '1d' });
    }

    public verifyToken(token: string): string | JwtPayload {
        return verify(token, secret);
    }
}