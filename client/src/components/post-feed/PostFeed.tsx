import { useState, useEffect } from 'react';
import './PostFeed.scss';
import { Link } from 'react-router-dom';

type Post = {
 _id: string;
 body: string;
 userId: string;
}

const PostFeed = () => {

 const [posts, setPosts] = useState<Post[]>([]);

 useEffect(() => {
  async function fetchPosts() {
   const response = await fetch('http://localhost:5000/posts')
   const posts = await response.json()
   setPosts(posts)
  }
  fetchPosts()
 }, [])

 return (
  <div className='post-feed'>
   {posts.map((post) => (
    <div key={post._id} className='post'>
     <div>
      Post created by: <Link to={`/user/${post.userId}`}>{post?.userId}</Link>
     </div>
     <div>{post.body}</div>
    </div>
   ))}
  </div>
 );
}

export default PostFeed;