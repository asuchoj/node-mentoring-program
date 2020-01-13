import * as express from "express";

import {userErrorSchema} from './../errorsSchemas/user.error.shema';
import {getUserById, getLimitUsers, deleteUser, addUser, updateUser} from "../controllers/user.controllers";
import {validateSchema} from "../utils/validateSchema";
 
const userRouter = express.Router();

userRouter.get("/user/:id", getUserById);
userRouter.get("/users", getLimitUsers);
userRouter.post("/user", validateSchema(userErrorSchema), addUser);
userRouter.put("/user", validateSchema(userErrorSchema), updateUser);
userRouter.delete("/user", deleteUser);

export {userRouter};