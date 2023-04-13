import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUserService from "../../../services/CreateUserService";
import DeleteUserService from "../../../services/DeleteUserService";
import ListUsersService from "../../../services/ListUsersService";
import ShowUserService from "../../../services/ShowUserService";

export default class UserController {
    public async index(req: Request, res: Response): Promise<Response> {
        const listUsersService = container.resolve(ListUsersService);

        const users = await listUsersService.execute();
    
        return res.json(users);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        
        const showUserService = container.resolve(ShowUserService);

        const user = await showUserService.execute(id);

        return res.json(user);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;

        const createUserService = container.resolve(CreateUserService);

        const user = await createUserService.execute({ name, email, password });

        return res.json(user);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const deleteUserService = container.resolve(DeleteUserService);

        await deleteUserService.execute(id);

        return res.json([]);
    }
}