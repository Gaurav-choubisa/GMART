import jwt from 'jsonwebtoken';
import UserModel from '../models/user-model.js';

const generateRefreshToken = async (userId) => {
    const token = jwt.sign(
        { id: userId },
        process.env.SECRET_KEY_REFRESH_TOKEN,
        { expiresIn: '30d' }
    );

    // Store refresh token in the DB
    await UserModel.updateOne(
        { _id: userId },
        { refresh_Token: token }
    );

    return token;
};

export default generateRefreshToken;
