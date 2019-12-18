import * as express from "express";

import { User } from "./interfaces/user.interface";
import { imitationDB } from "./imitationDB/user..imitation";
import { validateSchema } from "./utils/validateSchema";
import { userErrorSchema } from "./errorsSchemas/user.error.shema";

const app: any = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(router);

router.get("/user", (req, res) => {
  try {
    if (req.query.id) {
      const userId: string = req.query.id;
      const foundUser: User = imitationDB.getUser(userId);

      res.send(JSON.stringify(foundUser));
    } else if (req.query.loginSubstring && req.query.from && req.query.to) {
      const loginSubstring: string = req.query.loginSubstring;
      const limit: { from: number; to: number } = {
        from: +req.query.from,
        to: +req.query.to
      };

      res.send(
        JSON.stringify(imitationDB.getAutoSuggestUsers(loginSubstring, limit))
      );
    }
  } catch {
    res.send("error!!!");
  }
});

router.post("/user", validateSchema(userErrorSchema), (req, res) => {
  try {
    let user: User = imitationDB.addDataForAddUser(req.body);
    imitationDB.addUser(user);
    res.status(200).send(true);
  } catch {
    res.send("error!!!");
  }
});

router.put("/user", validateSchema(userErrorSchema), (req, res) => {
  try {
    const userId: string = req.query.id;
    const user: User = req.body;
    imitationDB.updateUser(user, userId);
    res.status(201).send(true);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/user", (req, res) => {
  try {
    const userId: string = req.query.id;
    imitationDB.deleteUser(userId);
    res.send(true);
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
