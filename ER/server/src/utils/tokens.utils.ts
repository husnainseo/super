require("dotenv").config();
import { Response } from "express";
import { IUser } from "../interfaces/models.interface";
import { redis } from "../config/redis.config";
import jwt, { Secret } from "jsonwebtoken";
import { IActivationToken, ITokenOptions } from "../interfaces/token.interface";

//create activation token
export const OTPToken = (user: any): IActivationToken => {
    const OTP = Math.floor(1000 + Math.random() * 9000).toString();

    const token = jwt.sign({
        user, OTP
    }, process.env.JWT_SECRET as Secret, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    }
    );
    return { token, OTP }
};

// Parse environment variables
const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "5", 10);
const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "3", 10);

// Options for token
export const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 60 * 1000),
    maxAge: accessTokenExpire * 60 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production" ? true : false,
};

// Options for refresh token
export const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production" ? true : false,
};

export const sendToken = async (user: IUser, statusCode: number, res: Response) => {
    const accessToken = user.signAccessToken();
    const refreshToken = user.signRefreshToken();

    console.log('AccessToken Expiration Time:', accessTokenOptions.expires);
    console.log('RefreshToken Expiration Time:', refreshTokenOptions.expires);

    // Upload session to redis
    redis.set(user._id, JSON.stringify(user));

    // Cookie options
    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    res.status(statusCode).json({
        success: true,
        accessToken,
        user,
    });
};
