import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/infra/errors/AppError";
import { ICreateFavorites } from "../domain/models/ICreateFavorites";
import { IFavorites } from "../domain/models/IFavorites";
import { IFavoritesRepository } from "../domain/repositories/IFavoritesRepository";

@injectable()
export default class CreateFavoritesService {
    constructor(
        @inject('favoritesRepository')
        private favoritesRepository: IFavoritesRepository,
    ) {}

    public async execute({ news, user }: ICreateFavorites): Promise<IFavorites> {
        const favoriteExists = await this.favoritesRepository.findFavorite(user, news);

        if (favoriteExists) {
            throw new AppError('This favorite already exists');
        }

        const favorites = await this.favoritesRepository.create({
            news,
            user,
        });

        await this.favoritesRepository.save(favorites);

        return favorites;
    }
}