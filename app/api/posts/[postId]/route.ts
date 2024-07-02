import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/db";
import { Post } from "@/db/models/post";

export async function GET(
  _request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    await connectDB();

    const post = await Post.findById(params.postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "An error ocurred while fetching the post" },
      { status: 500 }
    );
  }
}

export interface DeletePostRequestBody {
  userId: string;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  auth().protect();

  const { userId }: DeletePostRequestBody = await request.json();

  try {
    await connectDB();

    const post = await Post.findById(params.postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (post.user.userId !== userId) {
      return NextResponse.json(
        { error: "Post does not belong to the user" },
        { status: 400 }
      );
    }

    await post.removePost();

    return NextResponse.json({ message: "Post deleted sucessfully" });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "An error ocurred while deleting the post" },
      { status: 500 }
    );
  }
}
