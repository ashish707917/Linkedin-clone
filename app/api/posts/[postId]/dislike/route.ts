import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

// Dislike (remove like) from post
export const POST = async (req: NextRequest, context: { params: { postId: string } }) => {
  try {
    await connectDB();
    const { postId } = await context.params;  // await here
    const userId = await req.json();          // read userId from request body

    const post = await Post.findById(postId);
    if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });

    await post.updateOne({ $pull: { likes: userId } });

    return NextResponse.json({ message: "Post disliked successfully." });
  } catch (error) {
    throw error;
  }
};

