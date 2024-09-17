import { createPost } from '@/actions/actions';
import PostForm from '@/components/post-form';
export default function NewPostPage() {
  return (
    <PostForm Action={createPost}></PostForm>
  );
}
