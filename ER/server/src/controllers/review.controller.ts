import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../utils/catchAsyncErrors.utils";
import ErrorHandler from "../utils/errorHandler.utils";
import { Review } from "../models/review.model";
import { IReview } from "../interfaces/models.interface";

//add Review
export const addReview = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviewData = req.body;
      const {
        locality,
        reviewer,
        stayDuration,
        positives,
        negatives,
        connectivity,
        lifeStyle,
        environment,
        safety,
      } = reviewData as IReview;
      if (
        !locality ||
        !reviewer ||
        !stayDuration ||
        !connectivity ||
        !lifeStyle ||
        !environment ||
        !safety
      ) {
        return next(new ErrorHandler("Please fill all the fields", 400));
      }
      const totalRating = connectivity + lifeStyle + environment + safety;
      const rating = totalRating / 4;
      reviewData.rating = rating;
      let avg = 0;

      const review = await Review.create(reviewData);

      res.status(200).json({
        success: true,
        review,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get all reviews for Dha Bahawalpur
export const getAllReviews = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const locality = req.params;
      const reviews = await Review.find({ locality: locality }).sort({
        createdAt: -1,
      });

      const numberOfReviews = reviews.length;
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const averageRating =
        numberOfReviews > 0 ? totalRating / numberOfReviews : 0;

      res.status(200).json({
        success: true,
        reviews,
        averageRating,
        numberOfReviews,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
