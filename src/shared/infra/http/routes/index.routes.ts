import { Router } from 'express';
import favoritesRouter from '../../../../modules/favorites/infra/http/routes/favorites.routes';
import friendsRouter from '../../../../modules/friends/infra/http/routes/friends.routes';
import requestedFriendsRouter from '../../../../modules/friends/infra/http/routes/requested.friends.routes';
import unconfirmedFriendsRouter from '../../../../modules/friends/infra/http/routes/unconfirmed.friends.routes';
import commentRouter from '../../../../modules/news/infra/http/routes/comment.routes';
import likeRouter from '../../../../modules/news/infra/http/routes/like.routes';
import listNewsByUserIdRouter from '../../../../modules/news/infra/http/routes/list_news_by_user_id.routes';
import newsRouter from '../../../../modules/news/infra/http/routes/news.routes';
import notificationRouter from '../../../../modules/notifications/infra/http/routes/notification.routes';
import sessionRouter from '../../../../modules/users/infra/http/routes/session.routes';
import userRouter from '../../../../modules/users/infra/http/routes/user.routes';
import { verify } from 'jsonwebtoken';
import { secret } from '../../../../config/secret';

const router = Router();

router.use('/user', userRouter);
router.use('/session', sessionRouter);
router.use('/news', newsRouter);
router.use('/news/user', listNewsByUserIdRouter);
router.use('/news/like', likeRouter);
router.use('/news/comment', commentRouter);
router.use('/favorites/news', favoritesRouter);
router.use('/friends', friendsRouter);
router.use('/friends/requested', requestedFriendsRouter);
router.use('/friends/unconfirmed', unconfirmedFriendsRouter);
router.use('/notification', notificationRouter);
router.post('/verify-token', (req, res) => {
    const { token } = req.body;

    try {
        verify(token, secret);

        return res.json(true);
    } catch (e) {
        return res.json(false);
    }
});

export default router;