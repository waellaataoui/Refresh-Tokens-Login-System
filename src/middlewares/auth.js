import jwt from 'jsonwebtoken';
import { generateJWT, generateRT } from '../utils/tokens';
import { updateRequest } from '../models/';

export const authorize = async (req, res, next) => {
  if (!req.cookies.jwt) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const user = { id: decoded.id };
    req.user = user;
    next();
  } catch (err) {
    // invalid signature
    if (err.name === 'JsonWebTokenError') return res.sendStatus(401);
    //expired ->refresh
    const rt = req.cookies.rt;
    if (!rt) return res.sendStatus(401);

    try {
      const payload = jwt.verify(rt, process.env.RT_SECRET);
      const token = await generateJWT(payload.id);
      const rToken = await generateRT(payload.id);
      res.cookie('jwt', token, { httpOnly: true, sameSite: 'lax' });
      res.cookie('rt', rToken, { httpOnly: true, sameSite: 'lax' });
      const user = { id: payload.id };
      req.user = user;
      next();
    } catch (error) {
      return res.sendStatus(401);
    }
  }
};
// validate reset password
export const validatePasswordReset = async (req, res, next) => {
  const id = req.params.id;
  try {
    const request = await updateRequest.findOne({ where: { id } });
    if (!request) return res.sendStatus(404);
    const decoded = jwt.verify(request.token, process.env.RESET_SECRET);
    await request.destroy();
    req.email = decoded.email;
    next();
  } catch (error) {
    console.log(error);
    await request.destroy();
    return res.sendStatus(404);
  }
};
