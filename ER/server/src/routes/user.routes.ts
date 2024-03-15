import * as express from "express";
import {
  signUp,
  activateUser,
  login,
  logout,
  updateAccessToken,
  socialAuth,
  updatePassword,
  userCheck,
  getUserInfo,
  getAllUsers,
  updateUserRole,
  deleteUser,
  updateProfileInfo,
  updateAvatar,
} from "../controllers/user.controller";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.middleware";

const userRouter = express.Router();
userRouter.post("/signup", signUp);
userRouter.post("/activate", activateUser);
userRouter.post("/login", login);
userRouter.get("/logout",updateAccessToken, isAuthenticated, logout);
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me",updateAccessToken, isAuthenticated, getUserInfo);
userRouter.put("/update-profile-info",updateAccessToken, isAuthenticated, updateProfileInfo)
userRouter.put(
  "/update-avatar",
  updateAccessToken,
  isAuthenticated,
  updateAvatar
);
userRouter.post("/social-auth", socialAuth);
userRouter.put("/update-password",updateAccessToken, isAuthenticated, updatePassword);
userRouter.post("/check", userCheck);
userRouter.get(
  "/get-users",
  updateAccessToken,
  isAuthenticated,
  isAuthorized("admin"),
  getAllUsers
);
userRouter.put(
  "/update-role/:id",
  updateAccessToken,
  isAuthenticated,
  isAuthorized("admin"),
  updateUserRole
);
userRouter.delete(
  "/delete-user/:id",
  updateAccessToken,
  isAuthenticated,
  isAuthorized("admin"),
  deleteUser
);
export default userRouter;
