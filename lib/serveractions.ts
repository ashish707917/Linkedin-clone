'use server'
import { Post } from "@/models/post.model";
import { IUser } from "@/models/user.model";
import { currentUser } from "@clerk/nextjs/server"
import { v2 as cloudinary } from 'cloudinary'
import connectDB from "./db";
import { revalidatePath } from "next/cache";
import { Comment, ICommentDocument } from "@/models/comment.model";

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME!, 
  api_key: process.env.API_KEY!, 
  api_secret: process.env.API_SECRET!
});

export const createPostAction = async (inputText: string, selectedFile: string) => {
  await connectDB();
  const user = await currentUser();
  if (!user) throw new Error('User not authenticated');
  if (!inputText) throw new Error('Input field is required');

  const userDatabase: IUser = {
    firstName: user.firstName || "ashish",
    lastName: user.lastName || 'mern stack',
    userId: user.id,
    ProfilePhoto: user.imageUrl
  }

  try {
    if (selectedFile) {
      // Use type assertion or define uploadResponse type based on cloudinary docs
      const uploadResponse = await cloudinary.uploader.upload(selectedFile);
      await Post.create({
        description: inputText,
        user: userDatabase,
        imageUrl: uploadResponse.secure_url
      });
    } else {
      await Post.create({
        description: inputText,
        user: userDatabase
      });
    }
    revalidatePath("/");
  } catch (error: unknown) {
    // Safely check if error is instance of Error
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Unknown error occurred during post creation');
  }
}

export const getAllPosts = async () => {
  await connectDB();
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: 'comments', options: { sort: { createdAt: -1 } } });
    if (!posts) return [];
    return JSON.parse(JSON.stringify(posts));
  } catch {
    // We don't use the error, so omit param to avoid warning
    console.log('Error fetching posts'); 
    return [];
  }
}

export const deletePostAction = async (postId: string) => {
  await connectDB();
  const user = await currentUser();
  if (!user) throw new Error('User not authenticated.');
  const post = await Post.findById(postId);
  if (!post) throw new Error('Post not found');

  if (post.user.userId !== user.id) {
    throw new Error('You are not the owner.');
  }

  try {
    await Post.deleteOne({ _id: postId });
    revalidatePath("/");
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An error occurred while deleting the post');
  }
}

export const createCommentAction = async (postId: string, formData: FormData) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error('User not authenticated.');
    const inputText = formData.get('inputText') as string;
    if (!inputText) throw new Error('Field is required');
    if (!postId) throw new Error('Post id required');

    const userDatabase: IUser = {
      firstName: user.firstName || "ashish",
      lastName: user.lastName || 'mern stack',
      userId: user.id,
      ProfilePhoto: user.imageUrl
    };

    const post = await Post.findById(postId);
    if (!post) throw new Error('Post not found');

    const comment: ICommentDocument = await Comment.create({
      textMessage: inputText,
      user: userDatabase,
    });

    post.comments?.push(comment.id);
    await post.save();
    revalidatePath('/');
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An unknown error occurred while creating the comment');
  }
}
