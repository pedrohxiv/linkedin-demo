"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

import { AddPostRequestBody } from "@/app/api/posts/route";
import { Post } from "@/db/models/post";
import { IUser } from "@/types/user";

const uploadthing = new UTApi();

export const createPostAction = async (formData: FormData) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const postInput = formData.get("postInput") as string;
  const image = formData.get("image") as File;

  if (!postInput) {
    throw new Error("post input is required");
  }

  const userDB: IUser = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  };

  try {
    if (image.size > 0) {
      const response = await uploadthing.uploadFiles([image]);

      const body: AddPostRequestBody = {
        user: userDB,
        text: postInput,
        imageUrl: response[0].data?.url,
      };

      await Post.create(body);
    } else {
      const body: AddPostRequestBody = {
        user: userDB,
        text: postInput,
      };

      await Post.create(body);
    }
  } catch (error: any) {
    throw new Error("Failed to create post", error);
  } finally {
    revalidatePath("/");
  }
};
