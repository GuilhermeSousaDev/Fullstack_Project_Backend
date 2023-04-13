import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: true,
    message: 'Too many request from this IP, try again after an hour',
});

export { limiter };