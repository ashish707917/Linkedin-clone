import { currentUser } from "@clerk/nextjs/server";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import News from "./components/News";

type User = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
  email?: string | null;
};

function normalizeUser(user: Awaited<ReturnType<typeof currentUser>>): User | null {
  if (!user) return null;

  return {
    id: user.id,
    firstName: user.firstName ?? undefined,
    lastName: user.lastName ?? undefined,
    imageUrl: user.imageUrl ?? undefined,
    email: user.emailAddresses?.[0]?.emailAddress ?? undefined,
  };
}

export default async function Home() {
  const clerkUser = await currentUser();
  const user = normalizeUser(clerkUser);

  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto flex justify-between gap-8">
        <Sidebar user={user} />
        <Feed user ={user} />
        <News />
      </div>
    </div>
  );
}
