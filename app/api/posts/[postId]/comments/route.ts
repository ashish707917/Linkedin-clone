import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    await connectDB();

    const postId = params.postId;

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const populatedPost = await post.populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
    });

    return NextResponse.json(populatedPost);
  } catch (err) {
    console.error("Error fetching comments:", err);
    return NextResponse.json(
      { error: "An error occurred while fetching comments." },
      { status: 500 }
    );
  }
}
