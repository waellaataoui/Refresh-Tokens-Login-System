import express from 'express';
import { indexPage } from '../controllers';
// import { homeController } from '../controllers';

const indexRouter = express.Router();
indexRouter.get('/', indexPage);

// indexRouter.get('/', homeController.indexPage);
export default indexRouter;
