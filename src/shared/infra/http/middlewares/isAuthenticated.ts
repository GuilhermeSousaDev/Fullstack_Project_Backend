import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { secret } from "../../../../config/secret";
import AppError from "../../errors/AppError";

interface IUserPayload {
    id: number;
    name: string;
    email: string;
}

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
        throw new AppError('Token not found');
    }

    try {
        const { id, name, email } = verify(token, secret) as IUserPayload;

        req.user = {
            id,
            email,
            name,
        };

        next();
    } catch (e) {
        throw new AppError('Invalid Token');
    }
}