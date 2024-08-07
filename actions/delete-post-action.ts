"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

export const deletePostAction = async (postId: string) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      user: true,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.user.userId !== user.id) {
    throw new Error("Post does not belong to the user");
  }

  try {
    await db.post.delete({
      where: {
        id: postId,
      },
    });
  } catch (error) {
    console.error(error);

    throw new Error("Failed to delete post");
  } finally {
    revalidatePath("/");
  }
};
