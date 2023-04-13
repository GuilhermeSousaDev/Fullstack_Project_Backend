import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateSessionService from "../../../services/CreateSessionService";

export default class SessionController {
    public async index(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        
        const createSessionService = container.resolve(CreateSessionService);

        const session = await createSessionService.execute({ email, password });

        return res.json(session);
    }
}