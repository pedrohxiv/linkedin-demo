"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

export const createCommentAction = async (
  postId: string,
  formData: FormData
) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  if (!postId) {
    throw new Error("Post id is required");
  }

  const commentInput = formData.get("commentInput") as string;

  if (!commentInput) {
    throw new Error("Comment input is required");
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
    await db.comment.create({
      data: {
        text: commentInput,
        user: {
          connect: {
            id: userData.id,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);

    throw new Error("Failed to create comment");
  } finally {
    revalidatePath("/");
  }
};
