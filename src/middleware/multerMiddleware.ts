import { Request } from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
    ) {
        cb(null, './src/uploads');
    },
    filename: function (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, filename: string) => void
    ) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

export { upload as multer, storage };
