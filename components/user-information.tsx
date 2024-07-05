import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IPostDocument } from "@/db/models/post";

interface Props {
  posts: IPostDocument[];
}

export const UserInformation = async ({ posts }: Props) => {
  const user = await currentUser();

  const userPosts = posts.filter((post) => post.user.userId === user?.id);

  const userComments = posts.flatMap(
    (post) =>
      post?.comments?.filter((comment) => comment.user.userId === user?.id) ||
      []
  );

  return (
    <div className="flex flex-col justify-center items-center bg-white mr-6 rounded-lg border py-4">
      <SignedIn>
        <Avatar>
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback className="bg-[#0b63c4] font-medium text-white">
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <p className="font-semibold">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-xs">
            @{user?.firstName}
            {user?.lastName}-{user?.id.slice(-4)}
          </p>
        </div>
        <hr className="w-full border-gray-200 my-5" />
        <div className="flex justify-between w-full px-4 text-sm">
          <p className="font-semibold">Posts</p>
          <p className="text-blue-400">{userPosts.length}</p>
        </div>
        <div className="flex justify-between w-full px-4 text-sm">
          <p className="font-semibold">Comments</p>
          <p className="text-blue-400">{userComments.length}</p>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="text-center space-x-2">
          <Button asChild className="bg-[#0b63c4] text-white">
            <SignInButton />
          </Button>
          <p className="font-semibold mt-2">You are not signed in</p>
        </div>
      </SignedOut>
    </div>
  );
};
