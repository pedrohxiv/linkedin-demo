"use client";

import { useUser } from "@clerk/nextjs";
import { useRef } from "react";

import { createCommentAction } from "@/actions/create-comment-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  postId: string;
}

export const CommentForm = ({ postId }: Props) => {
  const { user } = useUser();
  const { toast } = useToast();

  const ref = useRef<HTMLFormElement>(null);

  const handleCreateCommentAction = async (formData: FormData) => {
    if (!user?.id) {
      return;
    }

    const data = formData;

    ref.current?.reset();

    try {
      await createCommentAction(postId, data);
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
    <form
      ref={ref}
      action={(formData) => handleCreateCommentAction(formData)}
      className="flex items-center space-x-1"
    >
      <Avatar>
        <AvatarImage src={user?.imageUrl} />
        <AvatarFallback className="bg-[#0b63c4] font-medium text-white">
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-1 bg-white border rounded-full px-3 py-2">
        <input
          type="text"
          name="commentInput"
          placeholder="Add a comment..."
          className="outline-none flex-1 text-sm bg-transparent"
        />
        <button type="submit" hidden>
          Comment
        </button>
      </div>
    </form>
  );
};
