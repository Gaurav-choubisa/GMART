import UserModel from '../models/user-model.js';
import bcryptjs from 'bcryptjs'; 
import verifyEmailTemplate from '../utils/verifyEmailTemplates.js';
import sendEmail from '../config/SENDEMAIL.js';
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/user-model.js';
import  generateAccessToken  from '../utils/generateAccessToken.js';
import  generateRefreshToken  from '../utils/genrateRefreshToken.js';
import uploadImageCloudinary from '../utils/uploadImageCloudnary.js';
import genrateOtp from '../utils/genrateOtp.js'
import forgotPasswordTemplete from '../utils/forgotPasswordTemplete.js'
import jwt from 'jsonwebtoken'


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

export async function verifyUserController(request, response) {
    try {
        const { code } = request.body;

        if (!code) {
            return response.status(400).json({
                message: "Verification code is required",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ _id: code });

        if (!user) {
            return response.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        const updateUser = await UserModel.updateOne({ _id: code },
            { verify_email: true }
        );
        return response.status(200).json({
            message: "User verified successfully",
            error: false,
            success: true,
            data: user
        });

    } catch (error) {
        console.error("Verification error:", error);
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
} 

export async function loginController(request, response) {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).json({
                message: "Provide email and password",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return response.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }      
            if (user.status !== "active") {
            return response.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            return response.status(401).json({
                message: "Invalid password",
                error: true,
                success: false
            });
        }

        const accesstoken = await generateAccessToken(user._id);
        const refreshtoken = await generateRefreshToken(user._id);
        const cookieOptions = {
            httpOnly: true,
            secure: true, 
            sameSite: "None",
        };
        response.cookie("accesstoken", accesstoken, cookieOptions);
        response.cookie("refreshtoken", refreshtoken, cookieOptions);

        return response.status(200).json({
            message: "Login successful",
            error: false,
            success: true,
            data: {
                accesstoken,
                refreshtoken
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function logoutController(request, response) {
    try {
        const userId = request.userId;
        const cookieOptions = {
            httpOnly: true,
            secure: true, 
            sameSite: "None",
        };
        response.clearCookie("accesstoken", cookieOptions);
        response.clearCookie("refreshtoken", cookieOptions);

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, { refresh_Token: "" });

        return response.status(200).json({
            message: "Logout successful",
            error: false,
            success: true
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

//uploading user avatar
export async function uploadAvatarController(request, response) {
    try {
        const userId =  request.userId;
        const image = request.file;
        const upload = await uploadImageCloudinary(image)
        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            avatar: upload.url,
        });
        return response.status(200).json({
            message: "Avatar uploaded successfully",
            error: false,
            success: true,
            data: updateUser
        });

    } catch (error) {
        console.error("Avatar upload error:", error);
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
} 

// update user details
export async function updateUserDetailsController(request, responsee){
    try {
        const userId = request.userId;
        const { name, email, password, mobile } = request.body;

        let hashPassword = ""
        if(password){
            const salt = await bcryptjs.genSalt(10);
            hashPassword = await bcryptjs.hash(password, salt);
        }
        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            ...(name && { name }),
            ...(email && { email }),
            ...(mobile && { mobile }),
            ...(hashPassword && { password: hashPassword }),

        });

        return responsee.status(200).json({
            message: "User details updated successfully",
            error: false,
            success: true,
            data: updateUser
        });
        
    } catch (error) {
        console.error("Update user details error:", error);
        return responsee.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
        
    }
}

export async function forgotpasswordController(request, response) {
    try {
        const { email } = request.body;

        const user  = await UserModel.findOne({ email })
        if(!user){
           return response.status(400).json({
            message : "User not available",
            error : true,
            success : false  
        })
        }
        const Otp = genrateOtp()
        const expireTime  = new Date() + 60*60*1000
        const update =  await UserModel.findByIdAndUpdate(user._id,{
            forgot_password_otp : Otp,
            forgot_password_expiry: new Date(expireTime).toISOString()
            
        })
            await sendEmail(
            email, // Make sure it's a string
            "Forgot password form GMART",
            forgotPasswordTemplete({
                name: user.name,
                otp: Otp
            })
        );
        return response.json({
            message : "Check your Email",
            error : false,
            success : true
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false  
        })
    }

    }

//verify forgot password OTP
export async function verifyForgotPasswordController(request, response){
    try {
        const {email, otp} = request.body
        if(!email, !otp){
            return response.status(400).json({
                message : "provide required field, email and otp",
                error :  true,
                success : false
            })
        }
        const user  = await UserModel.findOne({ email })
        if(!user){
           return response.status(400).json({
            message : "User not available",
            error : true,
            success : false  
        })
        }
        const currentTime = new Date().toISOString()
        if(user.forgot_password_expiry < currentTime){
            return response.status(400).json({
                message : "OTP is expired please re-genrate",
                error : true,
                success:false
            })
        }
        if(user.forgot_password_otp !== otp){
                return response.status(400).json({
                    message: "please provide valid OTP",
                    error: true,
                    success: false
                })
        }

        return response.json({
            message : "otp verified successfully",
            error : false,
            succes : true
        })

        
    } catch (error) {
        return response.status(500).json({
            message  : error.message || error,
            error : true,
            success : false
        })
    }
}

// reset the password
export async function resetPasswordController(request, response){
    try {
         const {email, newPassword, confirmPassword} = request.body
        if(!email, !newPassword, !confirmPassword){
            return response.status(400).json({
                message : "provide required field",
                error :  true,
                success : false
            })
        }        
        const user  = await UserModel.findOne({ email })
        if(!user){
           return response.status(400).json({
            message : "Invalid Email",
            error : true,
            success : false  
        })
        }

        if(newPassword !== confirmPassword){
            return response.status(400).json({
                message : "please verify your new password",
                error : true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(newPassword, salt);
        
        const update = await UserModel.findByIdAndUpdate(user._id,{
            password : hashPassword
        })
        
        return response.json({
            message : "password updated successfully",
            error : false,
            success : true
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// refresh token generator
export async function refreshToken(request, response){
    try {
        const refreshToken =  request.cookies.refreshtoken || request.header?.authorization?.split(" ")[1];
        if(!refreshToken){
            return response.status(401).json({
                message : "Unaurthorized Token",
                error : true,
                success : false
            })

        }
        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_ACCESS_TOKEN);
        if(!verifyToken){
            return response.status(401).json({
                message : "Token is Expired",
                error : true,
                success : false
            })
        }
        const userId =   verifyToken._id;
        const newAccessToken = await generateAccessToken(userId)
         const cookieOptions = {
            httpOnly: true,
            secure: true, 
            sameSite: "None",
        };
        response.cookie('accesstoken', newAccessToken, cookieOptions)

        return response.json({
            message : "AccessToken Generated Successfully",
            error : false,
            success : true,
            data : {
               accesstoken :  newAccessToken
            }
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}