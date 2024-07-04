"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { ICommentBase } from "@/db/models/comment";
import { Post } from "@/db/models/post";
import { IUser } from "@/types/user";

export const createCommentAction = async (
  postId: string,
  formData: FormData
) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  if (!postId) {
    throw new Error("Post id is required");
  }

  const commentInput = formData.get("commentInput") as string;

  if (!commentInput) {
    throw new Error("Comment input is required");
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  const userDB: IUser = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  };

  const comment: ICommentBase = {
    user: userDB,
    text: commentInput,
  };

  try {
    await post.commentOnPost(comment);
  } catch (error: any) {
    throw new Error("Failed to create comment", error);
  } finally {
    revalidatePath("/");
  }
};
