import { Document, Types } from "mongoose";

// User interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  accountType: "Admin" | "User";
  profile?: IProfile;
  listings: IListing[];
  comparePassword(password: string): Promise<boolean>;
  signAccessToken: () => string;
  signRefreshToken: () => string;
}

//UserExists interface
export interface IUserExists extends Document {
  name: string;
  email: string;
  password: string;
  accountType: "Admin" | "User";
  profile: IProfile;
  listings: IListing[];
}

// User profile interface
export interface IProfile extends Document {
  user?: Types.ObjectId;
  mobile?: number;
  whatsapp?: number;
  image:{
    public_id: string;
    url: string;
  };
  };

export interface IListingImage {
  public_id: string;
  url: string;
}

interface IAnalyticsListing{
  views: number;
  locations: string[];
}

// Property interface
export interface IListing extends Document {
  purpose: string;
  propertyType: string;
  subPropertyType: string;
  city: string;
  location: string;
  area: { type: string, size: number };
  price: number;
  bedrooms: string;
  bathrooms: string;
  features: string[];
  title: string;
  description: string;
  images: IListingImage[];
  contact: number;
  whatsapp: number;
  name: string;
  coverImage: number;
  analytics: IAnalyticsListing;
  postedBy: Types.ObjectId;
  createdAt: Date;
}

//comment
export interface IComment extends Document {
  user: Types.ObjectId;
  comment: string;
}

//review
export interface IReview extends Document {
  user: IUser;
  rating: number;
  comment: string;
  commentReplies?: IComment[];
}

//notification
export interface INotification extends Document {
  user: IUser;
  message: string;
  read: boolean;
  createdAt: Date;
}



