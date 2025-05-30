import UserModel from '../models/user-model.js';
import bcryptjs from 'bcryptjs'; 
import verifyEmailTemplate from '../utils/verifyEmailTemplates.js';
import sendEmail from '../config/SENDEMAIL.js';
import dotenv from 'dotenv';
dotenv.config();

export async function registerUserController(request, response) {
    try {
        const { name, email, password } = request.body;

        if (!name || !email || !password) {
            return response.status(400).json({
                message: "Provide email, name, and password",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email });

        if (user) {
            return response.json({
                message: "Email already registered",
                error: true,
                success: false
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const payload = {
            name,
            email,
            password: hashPassword
        };

        const newUser = new UserModel(payload);
        const save = await newUser.save();

        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

     
        await sendEmail(
            email,
            "Verify email from GMART",
            verifyEmailTemplate({
                name,
                url: VerifyEmailUrl
            })
        );

        return response.status(201).json({
            message: "User registered successfully",
            error: false,
            success: true,
            data: save
        });

    } catch (error) {
        console.error("Registration error:", error); 
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export default registerUserController;
