import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/db";
import { ICommentBase } from "@/db/models/comment";
import { Post } from "@/db/models/post";
import { IUser } from "@/types/user";

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

    const comments = await post.getAllComments();

    return NextResponse.json(comments);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "An error ocurred while fetching comments" },
      { status: 500 }
    );
  }
}

export interface AddCommentRequestBody {
  user: IUser;
  text: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  auth().protect();

  const { user, text }: AddCommentRequestBody = await request.json();

  try {
    await connectDB();

    const post = await Post.findById(params.postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const comment: ICommentBase = { user, text };

    await post.commentOnPost(comment);

    return NextResponse.json({ message: "Comment added sucessfully" });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "An error ocurred while adding comment" },
      { status: 500 }
    );
  }
}
