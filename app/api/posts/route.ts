import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/db";
import { IPostBase, Post } from "@/db/models/post";
import { IUser } from "@/types/user";

export interface AddPostRequestBody {
  user: IUser;
  text: string;
  imageUrl?: string | null;
}

export async function POST(request: NextRequest) {
  auth().protect();

  const { user, text, imageUrl }: AddPostRequestBody = await request.json();

  const postData: IPostBase = { user, text, ...(imageUrl && { imageUrl }) };

  try {
    await connectDB();

    const post = await Post.create(postData);

    return NextResponse.json({ message: "Post created sucessfully", post });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "An error ocurred while creating the post" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const posts = await Post.getAllPosts();

    return NextResponse.json({ posts });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "An error ocurred while fetching posts" },
      { status: 500 }
    );
  }
}
