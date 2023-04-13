import { inject, injectable } from "tsyringe";
import { IFavorites } from "../domain/models/IFavorites";
import { IFavoritesRepository } from "../domain/repositories/IFavoritesRepository";

@injectable()
export default class ListFavoritesService {
    constructor(
        @inject('favoritesRepository')
        private favoritesRepository: IFavoritesRepository,
    ) {}

    public async execute(userId: number): Promise<IFavorites[]> {
        const favorites = await this.favoritesRepository.findByUserId(userId);

        return favorites;
    }
}