import express from 'express';
import {
  usersPage,
  register,
  requestMailUpdate,
  updateMail,
} from '../controllers';
import { authorize } from '../middlewares/auth';
import { validateEmailUpdate } from '../middlewares/users';

const usersRouter = express.Router();

usersRouter.get('/', authorize, usersPage);
usersRouter.post('/', register);
usersRouter.post('/requestmailupdate', authorize, requestMailUpdate);
usersRouter.post('/updatemail', authorize, validateEmailUpdate, updateMail);

export default usersRouter;
