"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

export const unlikeAction = async (postId: string) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  try {
    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          set: post.likes.filter((id: string) => id !== user.id),
        },
      },
    });
  } catch (error) {
    console.error(error);

    throw new Error("Failed to unlike post");
  } finally {
    revalidatePath("/");
  }
};
