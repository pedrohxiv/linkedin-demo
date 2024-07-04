import { Post } from "@/components/post";
import { IPostDocument } from "@/db/models/post";

interface Props {
  posts: IPostDocument[];
}

export const PostFeed = ({ posts }: Props) => {
  return (
    <div className="space-y-2 pb-20">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};
