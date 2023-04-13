import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/infra/errors/AppError";
import { IFavoritesRepository } from "../domain/repositories/IFavoritesRepository";

@injectable()
export default class DeleteFavoritesService {
    constructor(
        @inject('favoritesRepository')
        private favoritesRepository: IFavoritesRepository,
    ) {}

    public async execute(id: number): Promise<void> {
        const favorites = await this.favoritesRepository.findById(id);

        if (!favorites) {
            throw new AppError('Favorites not Found');
        }

        await this.favoritesRepository.remove(favorites);
    }
}