import mongoose, { Model, Schema } from "mongoose";
import { IReview } from "../interfaces/models.interface";


// Review Schema
const reviewSchema = new Schema<IReview>(
  {
    locality:{
        type: String,
        required: true,
    },
    reviewer:{
        type: String,
        required: true,
        enum:["Owner", "Tenant", "Agent", "Former-Resident"],
    },
    stayDuration:{
        type: String,
        required: true,
    },
    positives:{
        type: String,
    },
    negatives:{
        type: String,
    },
    connectivity:{
        type: Number,
        min: 1,
        max: 5,
        default: 1,
    },
    lifeStyle:{
        type: Number,
        min: 1,
        max: 5,
        default: 1,
    },
    safety:{
        type: Number,
        min: 1,
        max: 5,
        default: 1,
    },
    environment:{
        type: Number,
        min: 1,
        max: 5,
        default: 1,
    },
    rating:{
        type: Number,
        min: 1,
        max: 5,
        default: 1,
    }
  },
  { timestamps: true }
);

export const Review: Model<IReview> = mongoose.model("Review", reviewSchema);
