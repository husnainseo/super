import mongoose, { Model, Schema } from "mongoose";
import { IProfile } from "../interfaces/models.interface";

const profileSchema = new Schema<IProfile>({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  mobile: {
    type: String,
  },
  whatsapp: {
    type: String,
  },
  image: {
    public_id: {
      type: String,
  },
  url: {
      type: String,
  },
  },
}, { timestamps: true });

export const Profile: Model<IProfile> = mongoose.model("Profile", profileSchema);
