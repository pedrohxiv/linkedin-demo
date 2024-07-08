import { Post } from "@/components/post";
import { IPost } from "@/interfaces/post";

interface Props {
  posts: IPost["post"][];
}

export const PostFeed = ({ posts }: Props) => {
  return (
    <div className="space-y-2 pb-20">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
