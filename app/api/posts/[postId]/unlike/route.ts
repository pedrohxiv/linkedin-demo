import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/db";
import { Post } from "@/db/models/post";

export interface UnlikePostRequestBody {
  userId: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  auth().protect();

  const { userId }: UnlikePostRequestBody = await request.json();

  try {
    await connectDB();

    const post = await Post.findById(params.postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await post.unlikePost(userId);

    return NextResponse.json({ message: "Post unliked sucessfully" });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "An error ocurred while unliking the post" },
      { status: 500 }
    );
  }
}
