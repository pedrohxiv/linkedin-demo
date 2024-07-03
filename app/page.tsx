import { SignedIn } from "@clerk/nextjs";

import { PostFeed } from "@/components/post-feed";
import { PostForm } from "@/components/post-form";
import { UserInformation } from "@/components/user-information";
import { connectDB } from "@/db";
import { Post } from "@/db/models/post";

export const revalidate = 0;

const RootPage = async () => {
  await connectDB();

  const posts = await Post.getAllPosts();

  return (
    <div className="grid grid-cols-8 mt-5 sm:px-5">
      <section className="hidden md:inline md:col-span-2">
        <UserInformation />
      </section>
      <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto w-full">
        <SignedIn>
          <PostForm />
        </SignedIn>
        <PostFeed posts={posts} />
      </section>
      <section className="hidden xl:inline justify-center col-span-2"></section>
    </div>
  );
};

export default RootPage;
