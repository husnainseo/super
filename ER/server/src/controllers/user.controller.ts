import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler.utils";
import { User } from "../models/user.model";
import { IProfile, IUser, IUserExists } from "../interfaces/models.interface";
import { catchAsyncErrors } from "../utils/catchAsyncErrors.utils";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { sendEmail } from "../utils/mailSender.utils";
import cloudinary from "cloudinary";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/tokens.utils";
import { redis } from "../config/redis.config";
import { OTPToken } from "../utils/tokens.utils";
import ejs from "ejs";
import { Profile } from "../models/profile.model";
import path from "path";
import {
  IActivationRequest,
  ILogin,
  ISignUp,
  ISocialLogin,
  IUpdatePassword,
} from "../interfaces/auth.interface";
import { getUserById, getAllUsersServices, updateUserRoleService } from "../services/user.service";

require("dotenv").config();

//signup user
export const signUp = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, accountType }: ISignUp = req.body;

      if (!name || !email || !password) {
        return next(new ErrorHandler("Please fill all the fields", 400));
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(new ErrorHandler("User already exists", 400));
      }

      const user: ISignUp = {
        name,
        email,
        password,
        accountType,
      };
      const activationToken = OTPToken(user); //otp & user
      const activationOTP = activationToken.OTP;

      const data = { name: { name: user.name }, activationOTP };
      const html = await ejs.renderFile(
        path.join(__dirname, "../views/mail-templates/", "activationMail.ejs"),
        data
      );
      try {
        await sendEmail({
          email: user.email,
          subject: "Account Activation",
          template: "activationMail.ejs",
          data,
        });
        res.status(201).json({
          success: true,
          message: `Please check your email: ${user.email} to activate your account`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const activateUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code }: IActivationRequest =
        req.body;
      const newUser: { user: IUser; OTP: string } = jwt.verify(
        activation_token,
        process.env.JWT_SECRET as Secret
      ) as { user: IUser; OTP: string };
      if (newUser.OTP !== activation_code) {
        return next(new ErrorHandler("Invalid activation code", 400));
      }
      const { name, email, password } = newUser.user;
      const user = await User.create({
        name,
        email,
        password,
      });
      const image = `https://ui-avatars.com/api/?background=random&name=${name}`;
      const profile = await Profile.create({ user: user._id, image: { url: image } });
      user.profile = profile._id;
      await user.save();
      res.status(201).json({
        success: true,
        message: "Account activated successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//login user
export const login = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password }: ILogin = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
      }
      const userExist= await User.findOne({ email })
        .select("+password")
        .populate("profile listings");
      if (!userExist) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }
      if (userExist.password === undefined) {
        return next(new ErrorHandler("Invalid User - (social-login)", 400));
      }
      const isPasswordMatched = await userExist.comparePassword(password);
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }

      userExist.password = "";

      sendToken(userExist, 200, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//logout
export const logout = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });
      const userId = req.user?._id || "";

      // Use await or handle the Promise
      await redis.del(userId);

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update access token
export const updateAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refresh_token = req.cookies.refresh_token as string;
    const decoded = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as JwtPayload;
    const message = "Couldn't refresh token";
    if (!decoded) {
      return next(new ErrorHandler(message, 400));
    }
    const session = await redis.get(decoded.id as string);
    if (!session) {
      return next(new ErrorHandler(message, 400));
    }
    const user = JSON.parse(session);
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: "5min",
      }
    );
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: "3d",
      }
    );
    req.user = user;
    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    next();
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

//get user info
export const getUserInfo = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id;
      getUserById(userId, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update Avatar
export const updateAvatar = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { image } = req.body;
      const userId = req.user._id;

      if (!image) {
        return next(new ErrorHandler("Please upload an image", 400));
      }

      // Fetch the existing profile
      const user: IUserExists | null = await User.findById(userId).populate("profile listings");
      const profile = await Profile.findById(user?.profile._id);
      if (!profile) {
        return next(new ErrorHandler("Profile not found", 404));
      }

      if (image && profile) {
        if (profile.image && profile.image.public_id) {
          await cloudinary.v2.uploader.destroy(profile.image.public_id);
          const uploadedImage = await cloudinary.v2.uploader.upload(image, {
            folder: "avatars",
          });
          profile.image = {
            public_id: uploadedImage.public_id,
            url: uploadedImage.secure_url,
          };

        } else {
          const uploadedImage = await cloudinary.v2.uploader.upload(image, {
            folder: "avatars",
            width: 150,
          });
          profile.image = {
            public_id: uploadedImage.public_id,
            url: uploadedImage.secure_url,
          };
          if (user) {
            user.profile.image.url = uploadedImage.secure_url;
          }

        }
        await profile.save();

        console.log(user)
        redis.set(user?._id, JSON.stringify(user));
      }

      res.status(200).json({
        success: true,
        message: "Avatar updated successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update profile info
export const updateProfileInfo = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, mobile, whatsapp } = req.body;
      const userId = req.user._id;
      const user: IUserExists | null = await User.findById(userId).populate("profile listings");
      const profile: IProfile | null = await Profile.findById(user?.profile._id);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      } else {
        if (name && name !== "") {
          user.name = name;
        } if (profile) {
          if (mobile && mobile !== "") {
            profile.mobile = mobile;
            user.profile.mobile = mobile;
          } if (whatsapp && whatsapp !== "") {
            profile.whatsapp = whatsapp;
            user.profile.whatsapp = whatsapp;
          }
        }

        await user.save();
        await profile?.save();
        await redis.set(userId, JSON.stringify(user));
        res.status(200).json({
          success: true,
          message: "Profile updated successfully",
        })
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//social auth
export const socialAuth = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, image } = req.body as ISocialLogin;
      const user = await User.findOne({ email }).populate("profile listings");
      let img: string;
      if (!user) {
        const newUser = await User.create({ email, name });
        if (!image) {
          img = `https://ui-avatars.com/api/?background=random&name=${name}`;
        } else {
          img = image;
        }
        const profile = await Profile.create({ user: newUser._id, image: { url: img } });
        newUser.profile = profile._id;
        await newUser.save();
        newUser.profile = profile;
        sendToken(newUser, 200, res);
      } else {
        sendToken(user, 200, res);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update password
export const updatePassword = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { currentPassword, newPassword, confirmPassword } =
        req.body as IUpdatePassword;
      const user = await User.findById(req.user._id).select("+password");
      if (user?.password === undefined) {
        return next(new ErrorHandler("Invalid User", 400));
      }
      const isPasswordMatched = await user?.comparePassword(currentPassword);
      if (!newPassword || !confirmPassword || !currentPassword) {
        return next(new ErrorHandler("Please fill all the fields", 400));
      }
      if (newPassword !== confirmPassword) {
        return next(new ErrorHandler("Password doesn't match", 400));
      }
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Incorrect password", 400));
      }
      user.password = newPassword;
      await user.save();
      await redis.set(req.user._id, JSON.stringify(user));
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//test

export const userCheck = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
      success: true,
      user,
    });
  }
);

//get all users only for Admin
export const getAllUsers = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllUsersServices(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update user Role only-admin
export const updateUserRole = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, role } = req.body;
      updateUserRoleService(res, id, role);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


//delete user admin only
export const deleteUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404))
    }
    await user.deleteOne({ _id: id });
    await redis.del(id);
    res.status(200).json({
      success: true,
      message: "User deleted Successfully"
    })
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400))
  }
});
