import express from 'express';
import registerUserController from '../controllers/user-controller.js';


const userRouter = express.Router();

userRouter.post('/register', registerUserController);

export default userRouter;
