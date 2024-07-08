import { Comment, Post, User } from "@prisma/client";

export interface IPost {
  post: Post & { user: User; comments: (Comment & { user: User })[] };
}
