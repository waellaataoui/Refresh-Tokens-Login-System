
export const indexPage = (req, res) => res.status(200).json({ message: process.env.TEST_ENV_VARIABLE });
