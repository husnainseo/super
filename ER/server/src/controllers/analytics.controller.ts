import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { catchAsyncErrors } from "../utils/catchAsyncErrors.utils";
import ErrorHandler from "../utils/errorHandler.utils";
import { generateLast12MonthsData } from "../utils/analytics.generator";
import { Listing } from "../models/listings.model";

//get analytics
export const getUserAnalytics = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await generateLast12MonthsData(User);

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get analytics for listing
export const getListingAnalytics = catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const listings = await generateLast12MonthsData(Listing);
  
        res.status(200).json({
          success: true,
          listings,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  );