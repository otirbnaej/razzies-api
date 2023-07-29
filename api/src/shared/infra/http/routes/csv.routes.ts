import { Router } from 'express';
import multer from 'multer';
import ImportCSVController from '../controllers/ImportCSVController';

const storage = multer.diskStorage({
  destination: 'src/shared/infra/temp',
  filename: function (req, file, cb) {
    cb(null, 'movielist.csv');
  },
});

const upload = multer({ storage });

const routes = Router();

routes.post('/upload', upload.single('movielist'), ImportCSVController.create);

export default routes;
