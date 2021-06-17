import jsonwebtoken from 'jsonwebtoken';
export const generateJWT = async payload => {
  try {
    const token = await jsonwebtoken.sign(
      { id: payload },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 5,
      }
    );
    return token;
  } catch (error) {
    console.log(error);
  }
};
export const generateRT = async payload => {
  try {
    const token = await jsonwebtoken.sign(
      { id: payload },
      process.env.RT_SECRET,
      {
        expiresIn: '3 days',
      }
    );
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const generateResetToken = async payload => {
  try {
    const token = await jsonwebtoken.sign(
      { payload },
      process.env.RESET_SECRET,
      {
        expiresIn: 60 * 10,
      }
    );
    return token;
  } catch (error) {
    console.log(error);
  }
};
