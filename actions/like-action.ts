"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

export const likeAction = async (postId: string) => {
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

  let userData = await db.user.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!userData) {
    userData = await db.user.create({
      data: {
        userId: user.id,
        userImage: user.imageUrl,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      },
    });
  }

  try {
    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          push: userData.userId,
        },
      },
    });
  } catch (error) {
    console.error(error);

    throw new Error("Failed to like post");
  } finally {
    revalidatePath("/");
  }
};
