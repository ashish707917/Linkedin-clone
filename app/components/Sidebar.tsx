import Image from "next/image";
import React from "react";
import { getAllPosts } from "@/lib/serveractions";
import ProfilePhoto from "./ProfilePhoto";

type User = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
  username?: string | null;
};

type Post = {
  // Define the shape of your Post object here.
  // For example:
  id: string;
  title: string;
  content: string;
  createdAt: string;
  // Add other properties as needed
};

const Sidebar = async ({ user }: { user: User | null }) => {
  // Fetch posts - assuming getAllPosts returns Post[]
  const posts: Post[] = await getAllPosts();

  return (
    <div className="hidden md:block w-[20%] h-fit border bordergray-300 bg-white rounded-lg">
      <div className="flex relative flex-col items-center">
        <div className="w-full h-16 overflow-hidden">
          {user && (
            <Image
              src={"/banner.jpg"}
              alt="Banner"
              width={200}
              height={200}
              className="w-full h-full rounded-t"
            />
          )}
        </div>
        <div className="my-1 absolute top-10 left-[40%]">
          <ProfilePhoto src={user?.imageUrl ?? "/banner.jpg"} />
        </div>
        <div className="border-b border-b-gray-300">
          <div className="p-2 mt-5 text-center">
            <h1 className="font-bold hover:underline cursor-pointer">
              {user ? `${user.firstName ?? ""} ${user.lastName ?? ""}` : "Patel Mern Stack"}
            </h1>
            <p className="text-xs">@{user?.username ?? "username"}</p>
          </div>
        </div>
      </div>
      <div className="text-xs">
        <div className="w-full flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer">
          <p>Post Impression</p>
          <p className="text-blue-500 font-bold">88</p>
        </div>
        <div className="w-full flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer">
          <p>Posts</p>
          <p className="text-blue-500 font-bold">{posts.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
