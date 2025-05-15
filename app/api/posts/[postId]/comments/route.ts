import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

// Get all comments for a post, sorted by createdAt descending
export const GET = async (req: NextRequest, { params }: { params: { postId: string } }) => {
  try {
    await connectDB();
    const post = await Post.findById(params.postId);
    if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });

    await post.populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
    });

    return NextResponse.json(post.comments);
  } catch (error) {
    throw error;
  }
};
