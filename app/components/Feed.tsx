import React from "react";
import PostInput from "./PostInput";
import Posts from "./Posts";
import { getAllPosts } from "@/lib/serveractions";

type User = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
  email?: string | null;
};

const Feed = async ({ user }: { user: User | null }) => {
  if (!user) {
    return <div>User not found</div>;
  }

  const posts = await getAllPosts();

  return (
    <div className="flex-1">
      <PostInput user={user} />
      <Posts posts={posts ?? []} />
    </div>
  );
};

export default Feed;
