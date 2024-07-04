"use client";

import { SignedIn, useUser } from "@clerk/nextjs";
import { MessageCircle, Repeat2, Send, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";

import { CommentFeed } from "@/components/comment-feed";
import { CommentForm } from "@/components/comment-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { IPostDocument } from "@/db/models/post";
import { cn } from "@/lib/utils";

interface Props {
  post: IPostDocument;
}

export const PostOptions = ({ post }: Props) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<string[] | undefined>(post.likes);

  const { user } = useUser();
  const { toast } = useToast();

  const likeOrUnlikePost = async () => {
    if (!user?.id) {
      return;
    }

    const originalLiked = liked;
    const originalLikes = likes;

    const newLikes = liked
      ? likes?.filter((like) => like !== user.id)
      : [...(likes ?? []), user.id];

    const body: { userId: string } = {
      userId: user.id,
    };

    setLiked(!liked);
    setLikes(newLikes);

    const response = await fetch(
      `/api/posts/${post._id}/${liked ? "unlike" : "like"}`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const fetchLikesResponse = await fetch(`/api/posts/${post._id}/like`);

    if (!response.ok || !fetchLikesResponse.ok) {
      setLiked(originalLiked);
      setLikes(originalLikes);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }

    const likesData = await fetchLikesResponse.json();

    setLikes(likesData);
  };

  useEffect(() => {
    if (user?.id && post.likes?.includes(user.id)) {
      setLiked(true);
    }
  }, [post, user]);

  return (
    <div>
      <div className="flex justify-between p-4">
        <div>
          {likes && likes.length > 0 && (
            <p className="text-xs text-gray-500 cursor-pointer hover:underline">
              {likes.length} {likes.length === 1 ? "like" : "likes"}
            </p>
          )}
        </div>
        <div>
          {post.comments && post.comments.length > 0 && (
            <p
              onClick={() => setIsCommentsOpen(!isCommentsOpen)}
              className="text-xs text-gray-500 cursor-pointer hover:underline"
            >
              {post.comments.length}{" "}
              {post.comments.length === 1 ? "comment" : "comments"}
            </p>
          )}
        </div>
      </div>
      <div className="flex p-2 justify-between px-2 border-t">
        <Button
          variant="ghost"
          className="flex justify-center flex-1 text-gray-700/80"
          onClick={likeOrUnlikePost}
        >
          <ThumbsUp
            className={cn("mr-1", liked && "text-[#4881c2] fill-[#4881c2]")}
          />
          Like
        </Button>
        <Button
          variant="ghost"
          className="flex justify-center flex-1 text-gray-700/80"
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
        >
          <MessageCircle
            className={cn(
              "mr-1",
              isCommentsOpen && "text-gray-600 fill-gray-600"
            )}
          />
          Comment
        </Button>
        <Button
          variant="ghost"
          className="flex justify-center flex-1 text-gray-700/80"
        >
          <Repeat2 className="mr-1" />
          Repost
        </Button>
        <Button
          variant="ghost"
          className="flex justify-center flex-1 text-gray-700/80"
        >
          <Send className="mr-1" />
          Send
        </Button>
      </div>
      {isCommentsOpen && (
        <div className="p-4">
          <SignedIn>
            <CommentForm postId={post._id} />
          </SignedIn>
          {<CommentFeed post={post} />}
        </div>
      )}
    </div>
  );
};
