import { container } from 'tsyringe';
import { INewsRepository } from '../../../modules/news/domain/repositories/INewsRepository';
import NewsRepository from '../../../modules/news/infra/typeorm/repositories/NewsRepository';
import { IUserRepository } from '../../../modules/users/domain/repositories/IUserRepository';
import UserRepository from '../../../modules/users/infra/typeorm/repositories/UserRepository';
import { IFriendsRepository } from '../../../modules/friends/domain/repositories/IFriendsRepository';
import FriendsRepository from '../../../modules/friends/infra/typeorm/repositories/FriendsRepository';
import { INotificationRepository } from '../../../modules/notifications/domain/repositories/INotificationRepository';
import NotificationRepository from '../../../modules/notifications/infra/typeorm/repositories/NotificationRepository';
import { ILikesRepository } from '../../../modules/news/domain/repositories/ILikesRepository';
import LikesRepository from '../../../modules/news/infra/typeorm/repositories/LikesRepository';

import './providers/Bcrypt';
import './providers/Jwt';
import './providers/CacheProvider';
import './providers/DateFns';
import { ICommentRepository } from '../../../modules/news/domain/repositories/ICommentRepository';
import CommentRepository from '../../../modules/news/infra/typeorm/repositories/CommentRepository';
import { IFavoritesRepository } from '../../../modules/favorites/domain/repositories/IFavoritesRepository';
import FavoriteRepository from '../../../modules/favorites/infra/typeorm/repositories/FavoritesRepository';

container.registerSingleton<IUserRepository>(
    'userRepository',
    UserRepository,
);
container.registerSingleton<INewsRepository>(
    'newsRepository',
    NewsRepository,
);
container.registerSingleton<IFriendsRepository>(
    'friendsRepository',
    FriendsRepository,
);
container.registerSingleton<INotificationRepository>(
    'notificationRepository',
    NotificationRepository,
);
container.registerSingleton<ILikesRepository>(
    'likesRepository',
    LikesRepository,
);
container.registerSingleton<ICommentRepository>(
    'commentRepository',
    CommentRepository,
);
container.registerSingleton<IFavoritesRepository>(
    'favoritesRepository',
    FavoriteRepository,
);