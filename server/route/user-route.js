import express from "express";
import registerUserController, {
  usersDetails,
} from "../controllers/user-controller.js";
import { verifyUserController } from "../controllers/user-controller.js";
import { loginController } from "../controllers/user-controller.js";
import { logoutController } from "../controllers/user-controller.js";
import { uploadAvatarController } from "../controllers/user-controller.js";
import { updateUserDetailsController } from "../controllers/user-controller.js";
import { forgotpasswordController } from "../controllers/user-controller.js";
import { verifyForgotPasswordController } from "../controllers/user-controller.js";
import { resetPasswordController } from "../controllers/user-controller.js";
import { refreshToken } from "../controllers/user-controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyUserController);
userRouter.post("/login", loginController);
userRouter.get("/logout", auth, logoutController);
userRouter.put(
  "/upload-avatar",
  auth,
  upload.single("avatar"),
  uploadAvatarController
);
userRouter.put("/update-details", auth, updateUserDetailsController);
userRouter.put("/forgot-password", forgotpasswordController);
userRouter.put("/verify-forgot-password-otp", verifyForgotPasswordController);
userRouter.put("/reset-password", resetPasswordController);
userRouter.post("/refresh-token", refreshToken);
userRouter.get("/user-details", auth, usersDetails);

export default userRouter;
