import { useEffect, useState } from "react";
import './userList.scss';

type User = {
 _id: string;
 name: string;
 email: string;
}

const UserList = () => {

 const [users, setUsers] = useState<User[]>([]);

 useEffect(() => {
  async function fetchUsers() {
   const response = await fetch('http://localhost:5000/users')
   const users = await response.json()
   setUsers(users)
  }
  fetchUsers()
 }, [])


 return (
  <div className="userList">
   {users.map((user) => (
    <div key={user._id} className="userCard">
     <p>{user.name}</p>
     <p>{user.email}</p>
    </div>
   ))}
  </div>
 );
}

export default UserList;