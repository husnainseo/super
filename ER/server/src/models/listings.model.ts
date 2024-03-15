import mongoose, { Model, Schema } from "mongoose";
import { IListing } from "../interfaces/models.interface";

// Profile Schema
const listingSchema = new Schema<IListing>(
    {
        purpose: {
            type: String,
            enum: ["rent", "sale"],
            required: true,
        },
        propertyType: {
            type: String,
            enum: ["residential", "commercial", "plot"],
            required: true,
        },
        subPropertyType: {
            type: String,
            enum: [
                "residentialPlot",
                "commercialPlot",
                "agricultureLand",
                "plotFile",
                "office",
                "shop",
                "warehouse",
                "building",
                "house",
                "flat",
                "upperPortion",
                "lowerPortion",
                "room",
                "hostel",
                "other",
            ],
            required: true,
        },
        city: {
            type: String,
            enum: [
                "karachi",
                "lahore",
                "bahawalpur",
                "islamabad",
                "rawalpindi",
                "multan",
                "faisalabad",
                "hyderabad",
                "gawadar",
                "quetta",
                "peshawar",
                "sialkot",
                "gujranwala",
                "abbottabad",
                "sargodha",
                "sahiwal",
                "gujrat",
                "sukkur",
                "hyederabad",
                "jhelum",
                "muzaffarabad",
                "mirpur",
                "mardan",
                "kohat",
                "deraIsmailKhan",
                "deraGhaziKhan",
            ],
            required: true,
        },
        area: {
            type: {
                type: String,
                enum: ["marla", "sqft", "sqyd", "kanal"],
                required: true,
            },
            size: {
                type: Number,
                required: true,
            },
        },
        location: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },
        bedrooms: {
            type: String,
        },
        bathrooms: {
            type: String,
        },
        features: [
            {
                type: {
                    type: String,
                },
                value: {
                    type: String,
                },
            },
        ],
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },
        images: [
            {
                public_id: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        ],
        coverImage: {
            type: Number,
            default: 0,
        },
        contact: {
            type: Number,
        },
        whatsapp: {
            type: Number,
        },
        name: {
            type: String,
        },
        analytics: {
            views: {
                type: Number,
                default: 0,
            },
            locations:[
                {type: String}
            ]
        },
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export const Listing: Model<IListing> = mongoose.model(
    "Listing",
    listingSchema
);
