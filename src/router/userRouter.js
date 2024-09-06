import { Router } from "express";
import {
  createUser,
  deleteUser,
  loginUser,
  myProfile,
  myProfileUpdate,
  readAllUsers,
  readSpecificUser,
  updateUser,
} from "../controller/userController.js";

const userRouter = Router();
userRouter.route("/").post(createUser).get(readAllUsers);

userRouter.route("/login").post(loginUser);

userRouter.route("/my-profile").get(myProfile);

userRouter.route("/myprofileupdate").patch(myProfileUpdate);

//dynamic routes at bottom
userRouter
  .route("/:userId")
  .get(readSpecificUser)
  .patch(updateUser)
  .delete(deleteUser);

export default userRouter;
