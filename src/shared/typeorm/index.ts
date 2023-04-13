import { createConnection } from "typeorm";
import { User } from "../../modules/users/infra/typeorm/entities/User";
import { News } from "../../modules/news/infra/typeorm/entites/News";
import { Likes } from "../../modules/news/infra/typeorm/entites/Likes";
import { Comment } from "../../modules/news/infra/typeorm/entites/Comment";
import { Friends } from "../../modules/friends/infra/typeorm/entities/Friends";
import { Notification } from "../../modules/notifications/infra/typeorm/entities/Notification";
import { Favorites } from "../../modules/favorites/infra/typeorm/entities/Favorites";

createConnection({
    type: "postgres",
    url: process.env.APP_API_DB_URI,
    database: "news",
    ssl: true,
    entities: [
        User,
        News,
        Friends,
        Notification,
        Likes,
        Comment,
        Favorites,
    ],
    synchronize: true,
    logging: false
})
.then(() => console.log('Conectado com Sucesso'))
.catch(error => console.log(error));