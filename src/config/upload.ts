import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const directory = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'Temp');

export const uploadConfig = {
    directory,
    tmpFolder,
    multer: {
        storage: multer.diskStorage({
            filename(req, file, callback) {
                const fileHash = crypto.randomBytes(10).toString('hex');

                const filename = `${fileHash}-${file.originalname}`;

                callback(null, filename);
            }
        }),
    }
}
