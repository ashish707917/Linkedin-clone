import mongoose, { Document, Model } from "mongoose";
export interface IUser{
    firstName:String,
    lastName:string,
    userId:string,
    ProfilePhoto?:string,
    bio?:string
}
export interface IUserDocument extends IUser, Document{
    createdAt: Date,
    updateAt:Date
}
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    ProfilePhoto:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    }
},{timestamps:true});
export const User : Model<IUserDocument> = mongoose.models?.User || mongoose.model<IUserDocument>("User",userSchema); 
