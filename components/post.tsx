"use client";

import { useUser } from "@clerk/nextjs";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import ReactTimeago from "react-timeago";

import { deletePostAction } from "@/actions/delete-post-action";
import { PostOptions } from "@/components/post-options";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { IPost } from "@/interfaces/post";

interface Props {
  post: IPost["post"];
}

export const Post = ({ post }: Props) => {
  const { user } = useUser();
  const { toast } = useToast();

  const isAuthor = user?.id === post.user.userId;

  const handleDeletePostAction = async (postId: string) => {
    try {
      await deletePostAction(postId);
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <div className="bg-white rounded-md border group">
      <div className="p-4 flex space-x-2">
        <div>
          <Avatar>
            <AvatarImage src={post.user.userImage} />
            <AvatarFallback className="bg-[#0b63c4] font-medium text-white">
              {post.user.firstName.charAt(0)}
              {post.user.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex justify-between flex-1">
          <div>
            <p className="font-semibold">
              {post.user.firstName} {post.user.lastName}{" "}
              {isAuthor && (
                <Badge className="ml-2" variant="secondary">
                  Author
                </Badge>
              )}
            </p>
            <p className="text-xs text-gray-400">
              @{post.user.firstName}
              {post.user.lastName}-{post.user.id.slice(-4)}
            </p>
            <p className="text-xs text-gray-400">
              <ReactTimeago date={new Date(post.createdAt)} />
            </p>
          </div>
          {isAuthor && (
            <Button
              className="opacity-0 group-hover:opacity-100 rounded-full hover:bg-destructive/10 p-3"
              variant="ghost"
              onClick={() => handleDeletePostAction(post.id)}
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          )}
        </div>
      </div>
      <div>
        <p className="px-4 pb-2 mt-2">{post.text}</p>
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt="post image"
            width={500}
            height={500}
            className="w-full mx-auto"
          />
        )}
      </div>
      <PostOptions post={post} />
    </div>
  );
};
