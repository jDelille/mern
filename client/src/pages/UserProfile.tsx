import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type User = {
 _id: string;
 name: string;
 email: string;
}

const UserProfile = () => {
 const { userId } = useParams();

 const [user, setUser] = useState<User>()

 useEffect(() => {
  async function fetchUser() {
   const response = await fetch(`http://localhost:5000/user/${userId}`)
   const user = await response.json()
   setUser(user)
  }
  fetchUser()
 }, [])


 return (
  <div>hello {user?.name}</div>
 );
}

export default UserProfile;