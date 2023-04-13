import { inject, injectable } from "tsyringe";
import { IRedisCache } from "../../../shared/infra/container/providers/CacheProvider/models/IRedisCache";
import { IFriendsRepository } from "../../friends/domain/repositories/IFriendsRepository";
import { INotificationRepository } from "../../notifications/domain/repositories/INotificationRepository";
import { ICreateNews } from "../domain/models/ICreateNews";
import { INews } from "../domain/models/INews";
import { INewsRepository } from "../domain/repositories/INewsRepository";
import FilestackStorageProvider from "../../../shared/providers/StorageProvider/FilestackStorageProvider";

@injectable()
export default class CreateNewsService {
    constructor(
        @inject('newsRepository')
        private newsRepository: INewsRepository,
        @inject('friendsRepository')
        private friendsRepository: IFriendsRepository,
        @inject('notificationRepository')
        private notificationRepository: INotificationRepository,
        @inject('cacheProvider')
        private cacheProvider: IRedisCache,
    ) {}

    public async execute({
        title,
        content,
        description,
        user,
        username,
        file,
    }: ICreateNews): Promise<INews> {
        const news = await this.newsRepository.create({
            title,
            content,
            user,
            description,
        });
        
        const filestackStorage = new FilestackStorageProvider();

        const picker = await filestackStorage.save(file.path, file.name);

        news.image = picker.url;

        await this.newsRepository.save(news);

        await this.cacheProvider.invalidate('api-news-NEWS_LIST');

        const friends = await this.friendsRepository.findUserFriends(Number(user));

        if (friends.length) {
          let promises = [];
          
          friends.forEach(({ friendId, userId }) => {
              promises.push(this.notificationRepository.createAndSave({
                 type: 'news',
                 linkId: news.id,
                 message: `${username} make a new post`,
                 receiveUserId: friendId === Number(user) ? userId : friendId,
              }));
          });
      
          await Promise.all(promises);
        }

        return news;
    }
}
