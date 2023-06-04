import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type User = {
 _id: string;
 name: string;
 email: string;
}

type Post = {
 _id: string;
 body: string;
 userId: string;
}

const UserProfile = () => {
 const { userId } = useParams();

 const [user, setUser] = useState<User>()
 const [posts, setPosts] = useState<Post[]>([])

 useEffect(() => {
  async function fetchUser() {
   const response = await fetch(`http://localhost:5000/user/${userId}`)
   const user = await response.json()
   setUser(user)
  }
  fetchUser()

  async function fetchUserPosts() {
   const response = await fetch(`http://localhost:5000/auth/posts?userId=${userId}`)
   const user = await response.json()
   setPosts(user)
  }
  fetchUserPosts()
 }, [])

 console.log(posts)


 return (
  <div>hello {user?.name}

   <div>
    {posts?.map((post) => (
     <div key={post._id}>{post.body}</div>
    ))}
   </div>
  </div>
 );
}

export default UserProfile;