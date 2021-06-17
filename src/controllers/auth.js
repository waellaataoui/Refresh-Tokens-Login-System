import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import { generateJWT, generateRT, generateResetToken } from '../utils/tokens';
import { sendMail } from '../utils/mailer';
const { or } = Sequelize.Op;
import { user, updateRequest } from '../models/';
import { v4 as uuidv4 } from 'uuid';
export const login = async (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).send({ error: 'bad request' });
  }
  try {
    const result = await user.findOne({
      where: { [or]: [{ username: identifier }, { email: identifier }] },
    });
    if (!result)
      return res.status(400).send({ error: 'verify your credentials' });

    const match = await bcrypt.compare(password, result.password);
    if (!match)
      return res.status(400).send({ error: 'verify your credentials' });
    if (!result.verified)
      return res.status(400).send({ error: 'Your account is not verified' });
    // create and assign tokens
    const jwt = await generateJWT(result.id);
    const rt = await generateRT(result.id);
    res.cookie('jwt', jwt, { httpOnly: true, sameSite: 'lax' });
    res.cookie('rt', rt, { httpOnly: true, sameSite: 'lax' });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
export const logout = (req, res) => {
  res.clearCookie('jwt');
  res.clearCookie('rt');
  res.sendStatus(200);
};

export const forgotPass = async (req, res) => {
  if (!req.body.email) return res.sendStatus(400);
  try {
    const exist = await user.findOne({ where: { email: req.body.email } });
    if (!exist) return res.send({ error: 'No user found with that email' });
  } catch (error) {
    res.sendStatus(500);
  }
  try {
    const token = await generateResetToken(req.body.email);
    const uuid = uuidv4();
    const entry = await updateRequest.create({ id: uuid, token });
    //send email
    const html = `<b style="font-size:20px;color:coral; ">Hello !</b><p style="font-size:16px;font-family:verdana;"> To reset your password please visit :
     <a target="_blank" href="localhost:5000/${uuid}">this link </a> <br/> 
    if you didn't expect this please consider changing your password to protect your account.
    </p> `;
    sendMail(req.body.email, 'Reset Password ', html);
    res.send(entry);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
export const getForgetPass = async (req, res) => {
  const id = req.params.id;
  try {
    const request = await updateRequest.findOne({ where: { id } });
    if (!request) return res.sendStatus(404);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
};

export const updatePass = async (req, res) => {
  const { password } = req.body;

  if (!password) return res.sendStatus(400);
  try {
    const usr = await user.findOne({ where: { email: req.email } });
    if (!usr) return res.sendStatus(404);
    usr.password = password;
    await usr.save();
    return res.send(usr);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
export const verifyEmail = async (req, res) => {
  const User = await user.findOne({ where: { email: req.email } });
  if (!User) return res.sendStatus(404);
  try {
    User.verified = true;
    await User.save();
    res.send(User);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
