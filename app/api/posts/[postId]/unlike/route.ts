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

    const likes = post.likes;

    return NextResponse.json(likes);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "An error ocurred while fetching likes" },
      { status: 500 }
    );
  }
}

export interface LikePostRequestBody {
  userId: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  auth().protect();

  const { userId }: LikePostRequestBody = await request.json();

  try {
    await connectDB();

    const post = await Post.findById(params.postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await post.likePost(userId);

    return NextResponse.json({ message: "Post liked sucessfully" });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "An error ocurred while liking the post" },
      { status: 500 }
    );
  }
}
