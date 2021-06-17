import jwt from 'jsonwebtoken';
import { updateRequest } from '../models/';

export const validateEmailUpdate = async (req, res, next) => {
  const code = req.body.code;
  try {
    const request = await updateRequest.findOne({ where: { id: code } });
    if (!request) return res.sendStatus(404);
    const decoded = jwt.verify(request.token, process.env.RESET_SECRET);
    await request.destroy();
    req.email = decoded.payload.email;
    next();
  } catch (error) {
    console.log(error);
    await request.destroy();
    return res.sendStatus(404);
  }
};
