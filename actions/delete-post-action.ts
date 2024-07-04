"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { Post } from "@/db/models/post";

export const deletePostAction = async (postId: string) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.user.userId !== user.id) {
    throw new Error("Post does not belong to the user");
  }

  try {
    await post.removePost();
  } catch (error: any) {
    throw new Error("Failed to delete post", error);
  } finally {
    revalidatePath("/");
  }
};
