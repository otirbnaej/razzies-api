import { Router } from 'express';
import multer from 'multer';
import ImportMoviesController from '../controllers/ImportMoviesController';

const storage = multer.diskStorage({
  destination: 'src/shared/infra/temp',
  filename: function (req, file, cb) {
    cb(null, 'movielist.csv');
  },
});

const upload = multer({ storage });

const routes = Router();

routes.post(
  '/upload-csv',
  upload.single('movielist'),
  ImportMoviesController.create,
);

export default routes;
