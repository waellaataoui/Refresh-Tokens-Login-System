import { user, updateRequest } from '../models/';
import crypto from 'crypto';
import { generateResetToken } from '../utils/tokens';
import { sendMail } from '../utils/mailer';

export const usersPage = async (req, res) => {
  try {
    const data = await user.findAll();
    res.status(200).send({ users: data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.stack });
  }
};
export const register = async (req, res) => {
  if (!req.body.password || !req.body.username || !req.body.email) {
    return res.status(400).send({ error: 'bad request' });
  }
  var newUser;
  try {
    newUser = await user.create({ ...req.body, verified: false });
  } catch (error) {
    res.status(400).send(error.message);
  }
  const code = crypto.randomBytes(2).toString('hex');

  try {
    const token = await generateResetToken({ email: newUser.email });
    await updateRequest.create({ id: code, token });
    const html = `<b style="font-size:20px;color:coral; ">Hello ${newUser.username} !</b>
    <p style="font-size:16px;font-family:verdana;"> This is Your verification code :
    <b style="letter-spacing:3px;"> ${code}</b> <br/> 
   This code expires in 10 minutes !
   </p> `;
    sendMail(newUser.email, 'Verify Your Email ', html);
    return res.send(newUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const requestMailUpdate = async (req, res) => {
  const { id } = req.user;
  const User = await user.findByPk(id);
  if (!User) return res.sendStatus(404);
  const code = crypto.randomBytes(2).toString('hex');

  try {
    const token = await generateResetToken({});
    await updateRequest.create({ id: code, token });
    const html = `<b style="font-size:20px;color:coral; ">Hello ${User.username} !</b>
    <p style="font-size:16px;font-family:verdana;"> This is Your verification code :
    <b style="letter-spacing:3px;"> ${code}</b> <br/> 
   This code expires in 10 minutes !
   </p> `;
    sendMail(User.email, 'Update Email Verification', html);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

  res.sendStatus(200);
};
export const updateMail = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.sendStatus(400);
  try {
    const usr = await user.findByPk(req.user.id);
    if (!usr) return res.sendStatus(404);
    usr.email = email;
    await usr.save();
    return res.send(usr);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
