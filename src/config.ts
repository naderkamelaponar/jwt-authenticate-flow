import dotenv from "dotenv";
dotenv.config();
const {
  NODE_ENV,
  PORT,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB_TEST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  TOKEN_SECRET,
} = process.env;
export default {
  env: NODE_ENV,
  port: PORT,
  host: POSTGRES_HOST,
  dbPort: POSTGRES_PORT,
  database: NODE_ENV === "dev" ? POSTGRES_DB : POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  bCryptPassword: BCRYPT_PASSWORD,
  saltRounds: SALT_ROUNDS,
  tokenSecret: TOKEN_SECRET,
};
