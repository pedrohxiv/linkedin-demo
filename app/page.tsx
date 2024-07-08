import { SignedIn } from "@clerk/nextjs";

import { PostFeed } from "@/components/post-feed";
import { PostForm } from "@/components/post-form";
import { UserInformation } from "@/components/user-information";
import { Widget } from "@/components/widget";
import { db } from "@/lib/db";

export const revalidate = 60;

const RootPage = async () => {
  const posts = await db.post.findMany({
    include: {
      user: true,
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="grid grid-cols-8 mt-5 sm:px-5">
      <section className="hidden md:inline md:col-span-2">
        <UserInformation posts={posts} />
      </section>
      <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto w-full">
        <SignedIn>
          <PostForm />
        </SignedIn>
        <PostFeed posts={posts} />
      </section>
      <section className="hidden xl:inline justify-center col-span-2">
        <Widget />
      </section>
    </div>
  );
};

export default RootPage;
