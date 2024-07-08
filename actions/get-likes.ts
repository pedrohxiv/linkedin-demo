"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

export const getLikes = async (postId: string) => {
  try {
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        likes: true,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    return post.likes;
  } catch (error) {
    console.error(error);

    throw new Error("Failed to get likes");
  } finally {
    revalidatePath("/");
  }
};
