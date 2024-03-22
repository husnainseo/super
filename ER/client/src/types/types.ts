export type TButtonConfig = {
  type: string;
  icon: React.ReactNode;
  label: string;
  counter?: () => void;
  dropDown?: () => void;
  handleButton?: (type: string, value: string) => void;
};
export interface ITag {
  type: string;
  value: string;
}
export type TFeatureType = {
  id?: number;
  feature: string;
  subFeature: TButtonConfig[];
  startOpen?: boolean;
  handleButton?: (type: string, value: string) => void;
  activeFeature?: ITag[] | string[];
  filter?:boolean
};

export interface FormState {
  purpose: string;
  propertyType: string;
  subPropertyType: string;
  city: string;
  location: string;
  area: { type: string; size: number };
  price: number;
  bedrooms: string;
  bathrooms: string;
  features: { type: string; value: string }[];
  title: string;
  description: string;
  contact: number;
  whatsapp: number;
  name: string;
  images: (string | ArrayBuffer | null | IListingImage)[];
  coverImage: number;
}
export interface IProfile {
  user?: string;
  mobile?: number;
  whatsapp?: number;
  image: {
    public_id: string;
    url: string;
  };
};

export interface IListingImage {
  public_id: string;
  url: string;
  _id: string;
}

interface IAnalyticsListing {
  views: number;
  locations: string[];
}
export interface IListing {
  _id: string;
  purpose: string;
  propertyType: string;
  subPropertyType: string;
  city: string;
  location: string;
  area: { type: string, size: number };
  price: number;
  bedrooms: string;
  bathrooms: string;
  features: { type: string; value: string }[];
  title: string;
  description: string;
  images: IListingImage[];
  contact: number;
  whatsapp: number;
  name: string;
  coverImage: number;
  analytics: IAnalyticsListing;
  postedBy: IUser;
  createdAt: Date;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  accountType: "Admin" | "User";
  profile: IProfile;
  listings: IListing[];
}

export interface IFilter {
  city: string;
  purpose: string;
  propertyType: string;
  subPropertyType: string[];
  minPrice: number;
  maxPrice: number;
  measureType: string;
  minSize: number;
  maxSize: number;
  bed: string[];
  bathroom: string[];
  features: string[];
  sort:string;
  location:string[]
}

export interface IParams  {
  city: string;
  purpose: "Buy" | "Rent";
  propertyType: string;
  subPropertyType?: string[];
  location?: string[] | null;
  minPrice?: string | null;
  maxPrice?: string | null;
  measureType?: string | null;
  minSize?: string | null;
  maxSize?: string | null;
  bed?: string[] | null;
  bath?: string[] | null;
  features?: string[] | null;
};

