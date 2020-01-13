import * as express from "express";
import {userRouter} from "./routers/user.router";

const app: any = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});