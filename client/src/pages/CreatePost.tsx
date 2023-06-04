import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";

type PostProps = {
 _id: string;
 userId: string;
 body: string;
}

const CreatePost = () => {
 const token = localStorage.getItem('token');
 const userId = localStorage.getItem('userId');


 const [body, setBody] = useState("")
 const [posts, setPosts] = useState<PostProps[]>([])

 async function handleCreatePost(event: React.FormEvent) {
  event.preventDefault();
  const response = await fetch('http://localhost:5000/posts', {
   method: "POST",
   body: JSON.stringify({ userId: userId, body }),
   headers: {
    "Content-Type": "application/json",
   }
  })
  //optimistic update decks 
  const post = await response.json();
  setPosts([...posts, post])
  setBody("")
 }

 useEffect(() => {
  async function fetchPosts() {
   const response = await fetch('http://localhost:5000/posts')
   const newDecks = await response.json()
   setPosts(newDecks)
  }
  fetchPosts()
 }, [])

 async function handleDeletePost(postId: string) {
  fetch(`http://localhost:5000/posts/${postId}`, {
   method: "DELETE",
  }).then(() => {
   //optimistic update posts 
   setPosts(posts.filter((post) => post._id !== postId))
  })
 }

 return (
  <div>
   <Navbar />
   <form onSubmit={handleCreatePost}>
    <label htmlFor='body'>Body</label>
    <input
     id="body"
     type="text"
     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBody(e.target.value)}
     value={body}
    />
    <button>Create Post</button>
   </form>
   <ul className='posts'>
    {posts.map((post) => (
     <li id={post._id} className='post'>
      <p>{post.body}</p>
      <p>{post.userId}</p>
      <button onClick={() => handleDeletePost(post._id)}>Delete</button>
     </li>
    ))}
   </ul>
  </div>
 );
}

export default CreatePost;