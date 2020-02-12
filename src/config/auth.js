import 'dotenv/config';

export default {
  secret: process.env.APP_SECRET,
  expiesIn: process.env.APP_SECRET_EXPIRES,
};
