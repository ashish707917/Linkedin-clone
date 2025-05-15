import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import News from "./components/News";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  

  // Safely pick only the plain serializable values you need
  const plainUser = user
    ? {
      id: user.id,
        username: user.username,
        imageUrl: user.imageUrl,
        firstName: user.firstName,
        lastName: user.lastName,
    }
    : null;

  return (
    <div className="pt-1">
      <div className="max-w-6xl mx-auto flex justify-between gap-8">
        {/* Sidebar */}
        <Sidebar user={plainUser} />
        {/* Feed */}
        <Feed user={plainUser}/>
        {/* News */}
        <News />
      </div>
    </div>
  );
}
