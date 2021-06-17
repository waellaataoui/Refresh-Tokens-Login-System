import express from 'express';
import {
  login,
  logout,
  forgotPass,
  getForgetPass,
  updatePass,
  verifyEmail,
} from '../controllers';
import { validatePasswordReset } from '../middlewares/auth';
import { validateEmailUpdate } from '../middlewares/users';

const authRouter = express.Router();
authRouter.post('/login', login);
authRouter.get('/logout', logout);
authRouter.post('/forgotpassword', forgotPass);
authRouter.get('/forgotpassword/:id', getForgetPass);
authRouter.put('/forgotpassword/:id', validatePasswordReset, updatePass);
authRouter.post('/verifyemail', validateEmailUpdate, verifyEmail);

export default authRouter;
