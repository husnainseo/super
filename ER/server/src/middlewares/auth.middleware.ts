import { Request, Response, NextFunction } from 'express';
import { catchAsyncErrors } from '../utils/catchAsyncErrors.utils';
import ErrorHandler from '../utils/errorHandler.utils';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { redis } from '../config/redis.config';

// authenticated user
export const isAuthenticated = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        return next(new ErrorHandler("Login first to access this resource", 401));
    }
    try {
        
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
        if (!decoded) {
            return next(new ErrorHandler("Access Token is not valid", 401));
        }
        const user = await redis.get(decoded.id);
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }
        req.user = JSON.parse(user);
        console.log('AccessToken Expiration Time (Middleware):', new Date(decoded.exp! * 1000));
        next();
    } catch (error:any) {
        if (error.name === 'TokenExpiredError') {
            // Handle token expiration error
            return next(new ErrorHandler("Access Token has expired", 401));
        } else {
            // Handle other errors
            return next(new ErrorHandler("Error decoding access token", 401));
        }
    }
});

//validate role
export const isAuthorized = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.user?.accountType || '';
        if (!roles.includes(userRole)) {
            return next(new ErrorHandler(`Role ${userRole} is not allowed to access this resource`, 403));
        }
        next();
    };
};

