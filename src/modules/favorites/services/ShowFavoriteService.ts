import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/infra/errors/AppError";
import { IFavorites } from "../domain/models/IFavorites";
import { IFavoritesRepository } from "../domain/repositories/IFavoritesRepository";

@injectable()
export default class ShowFavoritesService {
    constructor(
        @inject('favoritesRepository')
        private favoritesRepository: IFavoritesRepository,
    ) {}

    public async execute(id: number): Promise<IFavorites> {
        const favorite = await this.favoritesRepository.findById(id);

        if (!favorite) {
            throw new AppError('Favorite not found');
        }

        return favorite;
    }
}