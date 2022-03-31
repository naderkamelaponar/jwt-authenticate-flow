import { User, UserStore } from "../models/user.models";
import bcrypt from "bcrypt";
import config from "../config";
const userModel = new UserStore();
describe("Test Users Model", () => {
  const user: User = {
    username: "NaderKamel",
    password: "Password1234",
  };
  it("should return new user", async () => {
    const newUser = await userModel.create(user);
    expect(newUser?.username).toBe("NaderKamel");
  });

  it("should decode the password", async () => {
    const newUser = await userModel.create(user);
    const hashPassword = (password: string) => {
      const salt = parseInt(config.saltRounds as string, 10);
      return bcrypt.hashSync(`${password}${config.bCryptPassword}`, salt);
    };
    const newPassword = newUser.password;
    const isValidPassword = bcrypt.compareSync(
      `${newPassword}${config.bCryptPassword}`,
      hashPassword(newPassword)
    );
    expect(isValidPassword).toBe(true);
  });
});
