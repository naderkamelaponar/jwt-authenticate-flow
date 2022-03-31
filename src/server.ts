import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import userRoutes from "./handlers/users.handlers";
import bookRoutes from "./handlers/books.handlers";
const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("common"));
userRoutes(app);
bookRoutes(app);
const start = "بسم الله الرحمن الرحيم";
app.get("/", function (req: Request, res: Response) {
  res.send(start);
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
