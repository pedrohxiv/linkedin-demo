"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

import { db } from "@/lib/db";

export const createPostAction = async (formData: FormData) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  const postInput = formData.get("postInput") as string;

  if (!postInput) {
    throw new Error("Post input is required");
  }

  const image = formData.get("image") as File;

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
    if (image.size > 0) {
      const uploadthing = new UTApi();

      const response = await uploadthing.uploadFiles([image]);

      await db.post.create({
        data: {
          text: postInput,
          imageUrl: response[0].data?.url,
          user: {
            connect: {
              id: userData.id,
            },
          },
        },
      });
    } else {
      await db.post.create({
        data: {
          text: postInput,
          user: {
            connect: {
              id: userData.id,
            },
          },
        },
      });
    }
  } catch (error) {
    console.error(error);

    throw new Error("Failed to create post");
  } finally {
    revalidatePath("/");
  }
};
