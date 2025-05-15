import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, context: { params: { postId: string } }) => {
  try {
    await connectDB();
    const { postId } = await context.params;
    const post = await Post.findById(postId);
    if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });
    return NextResponse.json(post.likes);
  } catch (error) {
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
};
 export const POST = async (req: NextRequest, context: { params: { postId: string } }) => {
  try {
    await connectDB();
    const { postId } = await context.params;
    const userId = await req.json();
    const post = await Post.findById(postId);
    if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });
    await post.updateOne({ $addToSet: { likes: userId } });
    return NextResponse.json({ message: "Post liked successfully." });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
};