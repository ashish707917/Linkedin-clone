import mongoose, { Schema, model, Types, Model, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IComment {
  textMessage: string;
  user: {
    userId: string;
    ProfilePhoto: string;
    firstName: string;
    lastName: string;
  };
}

export interface ICommentDocument extends IComment, Document {
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<ICommentDocument>(
  {
    textMessage: {
      type: String,
      required: true,
    },
    user: {
      userId: {
        type: String,
        required: true,
      },
      ProfilePhoto: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export const Comment: Model<ICommentDocument> =
  mongoose.models.Comment || model<ICommentDocument>("Comment", commentSchema);
