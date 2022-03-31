import Client from "../database";
import bcrypt, { compareSync } from "bcrypt";
import config from "../config";
import jwt from "jsonwebtoken";
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
  id?: number;
  username: string;
  password: string;
};
const hashPassword = (password: string) => {
  const salt = parseInt(config.saltRounds as string, 10);
  return bcrypt.hashSync(`${password}${config.bCryptPassword}`, salt);
};
export class UserStore {
  async index(): Promise<User[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get users: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      //@ts-ignoreX$
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`unable show user ${id}: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users(username,password) VALUES ($1,$2) returning username";

      const resault = await conn.query(sql, [
        u.username,
        hashPassword(u.password),
      ]);
      const newUser: User = resault.rows[0];
      //var token = jwt.sign({ newUser }, config.tokenSecret as string);
      //console.log(token);
      return newUser;
    } catch (err) {
      throw new Error(`unable create user (${u.username}): ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM users WHERE id=($1)";

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`unable delete user (${id}): ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await Client.connect();
    const sql = "SELECT password FROM users WHERE username=($1)";

    const result = await conn.query(sql, [username]);

    console.log(password + pepper);

    if (result.rows.length) {
      const user = result.rows[0];

      console.log(user);

      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }

    return null;
  }
}
