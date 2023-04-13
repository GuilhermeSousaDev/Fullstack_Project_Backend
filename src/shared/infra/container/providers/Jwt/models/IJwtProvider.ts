import { JwtPayload } from "jsonwebtoken";
import { ICreateToken } from "./ICreateToken";

export interface IJwtProvider {
    generateToken({ id, name, email }: ICreateToken): string;
    verifyToken(token: string): string | JwtPayload;
}