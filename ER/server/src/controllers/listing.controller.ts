import { Listing } from "../models/listings.model";
import { IListing, IReview } from "../interfaces/models.interface";
import { catchAsyncErrors } from "../utils/catchAsyncErrors.utils";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler.utils";
import { User } from "../models/user.model";
import { IUser } from "../interfaces/models.interface";
import cloudinary from "cloudinary";
import { redis } from "../config/redis.config";
import { getAllListingsServices } from "../services/listing.service";
import axios from "axios";

//upload listing
export const uploadListing = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      if (data.images) {
        const images = await Promise.all(
          data.images.map(async (image: string) => {
            const uploadedImage = await cloudinary.v2.uploader.upload(image, {
              folder: "Gallery",
            });

            return {
              public_id: uploadedImage.public_id,
              url: uploadedImage.secure_url,
            };
          })
        );

        data.images = images;
      }
      const {
        purpose,
        propertyType,
        subPropertyType,
        city,
        area,
        location,
        price,
        title,
        description,
        contact,
        name,
        images,
      } = data;
      if (
        !purpose ||
        !propertyType ||
        !area ||
        !price ||
        !title ||
        !description ||
        !contact ||
        !name ||
        !subPropertyType ||
        !city ||
        !location
      ) {
        return next(new ErrorHandler("Please fill all the fields", 400));
      }
      const userId = req.user._id;
      const userExist = await User.findById(userId).populate("listings profile");
      if (!userExist) {
        return next(new ErrorHandler("User not found", 404));
      }
      const user: IUser = userExist;
      data.postedBy = user._id;
      const listing: IListing = await Listing.create(data);

      user.listings.push(listing as any);
      await user.save();


      await redis.set(userId, JSON.stringify(user));

      const existingListingsJSON = await redis.get("allListings");
      let existingListings = existingListingsJSON ? JSON.parse(existingListingsJSON) : [];

      existingListings.push(listing);

      const updatedListingsJSON = JSON.stringify(existingListings);

      await redis.set("allListings", updatedListingsJSON);

      res.status(200).json({
        message: "Listing created successfully",
        success: true,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//edit listing
export const editListing = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const listingId = req.params.id;
      const data = req.body;

      const existingListing = await Listing.findById(listingId);
      if (!existingListing) {
        return next(new ErrorHandler("Listing not found", 404));
      }
      const removedImages = existingListing.images.filter((image) => {
        return !data.images.some((newImage: any) => newImage.public_id === image.public_id);
      }
      );
      console.log("removed", removedImages)
      await Promise.all(
        removedImages.map(async (image) => {
          await cloudinary.v2.uploader.destroy(image.public_id);
          console.log(image.public_id)
        })
      );

      if (data.images) {
        const images = await Promise.all(
          data.images.map(async (image: string | { public_id: string; url: string }) => {
            if (typeof image === 'string') {
              const uploadedImage = await cloudinary.v2.uploader.upload(image, {
                folder: "Gallery",
              });

              return {
                public_id: uploadedImage.public_id,
                url: uploadedImage.secure_url,
              };
            } else {
              // if image is not a string, return it as is
              return image;
            }
          })
        );

        data.images = images;
      }

      const {
        purpose,
        propertyType,
        subPropertyType,
        city,
        area,
        location,
        price,
        title,
        description,
        contact,
        name,
        images,
      } = data;
      if (
        !purpose ||
        !propertyType ||
        !area ||
        !price ||
        !title ||
        !description ||
        !images ||
        !contact ||
        !name ||
        !subPropertyType ||
        !city ||
        !location
      ) {
        return next(new ErrorHandler("Please fill all the fields", 400));
      }
      const userId = req.user._id;
      const userExist = await User.findById(userId);
      if (!userExist) {
        return next(new ErrorHandler("User not found", 404));
      }
      const user: IUser = userExist;
      data.postedBy = user;
      const listing = await Listing.findOneAndUpdate(
        { _id: listingId },
        { $set: data },
        { new: true }
      ).lean();

      if (!listing) {
        // Handle the case where no listing was found
        return next(new ErrorHandler("Listing not found", 404));
      }

      const updatedListing: IListing = {
        ...listing,
        // Add any other necessary properties here
      };

      const propertyIndex = user.listings.findIndex(
        (property) => property._id.toString() === listingId
      );

      if (propertyIndex !== -1) {
        user.listings[propertyIndex] = updatedListing as IListing;
      }
      const updatedUser = await User.findById(userId).populate("listings profile");
      await redis.set(userId, JSON.stringify(updatedUser));
      await user.save();
      res.status(200).json({
        message: "Listing updated successfully",
        success: true,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get Single listing
export const getSingleListing = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const listingId = req.params.id;
      // const isCacheExist = await redis.get(listingId);

      // if (isCacheExist) {
      //   const listing = JSON.parse(isCacheExist);
      //   res.status(200).json({
      //     message: "Listing fetched successfully",
      //     success: true,
      //     listing,
      //   });
      // } else {
      const listing = await Listing.findById(listingId)
        .populate({
          path: 'postedBy',
          populate: { path: 'profile' }
        })
        .lean();

      if (listing) {
        const clientIP =
          req.headers["x-forwarded-for"] ||
          req.headers["x-real-ip"] ||
          req.connection.remoteAddress;
        const location = await axios.get(
          `http://api.ipapi.com/api/${clientIP}?access_key=${process.env.IP_API_KEY}}`
        );
        listing.analytics.locations.push(location.data.country_name);
        listing.analytics.views += 1;
      }
      // await redis.set(listingId, JSON.stringify(listing));
      await redis.del("allListings");
      if (!listing) {
        return next(new ErrorHandler("Listing not found", 404));
      }
      res.status(200).json({
        message: "Listing fetched successfully",
        success: true,
        listing,
      });
      // }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get all listings
export const getAllListings = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCacheExist = await redis.get("allListings");
      if (isCacheExist) {
        const listings = JSON.parse(isCacheExist);
        res.status(200).json({
          message: "Listings fetched successfully",
          success: true,
          listings,
        });
      } else {
        const listings = await Listing.find()
          .populate("postedBy", "name")
          .lean();
        await redis.set("allListings", JSON.stringify(listings));
        res.status(200).json({
          message: "Listings fetched successfully",
          success: true,
          listings,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get all listing only for Admin
export const getListing = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllListingsServices(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//delet listing User only
export const deleteListingUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId = req.user._id;
      const listing = await Listing.findById(id);
      const user = req.user;
      if (!listing) {
        return next(new ErrorHandler("Listing not found", 404));
      } else {
        if (listing.postedBy.toString() !== userId.toString()) {
          return next(new ErrorHandler("You are not authorized to delete this listing", 400));
        }
        for (const image of listing.images) {
          await cloudinary.v2.uploader.destroy(image.public_id);
        }
        await listing.deleteOne({ _id: id });
        await User.findByIdAndUpdate(userId, { $pull: { listings: id } });
        const updatedUser = await User.findById(userId).populate("listings profile");
        await redis.set(userId, JSON.stringify(updatedUser));
        await redis.del(id);
        res.status(200).json({
          success: true,
          message: "Listing deleted Successfully",
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


//delete listing admin only
export const deleteListing = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const listing = await Listing.findById(id);
      if (!listing) {
        return next(new ErrorHandler("Listing not found", 404));
      }
      for (const image of listing.images) {
        await cloudinary.v2.uploader.destroy(image.public_id);
      }

      await listing.deleteOne({ id });
      const userId = listing.postedBy.toString();
      const updatedUser = await User.findById(userId).populate("listings profile");
      await redis.set(userId, JSON.stringify(updatedUser));
      await redis.del(id);
      res.status(200).json({
        success: true,
        message: "Listing deleted Successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
