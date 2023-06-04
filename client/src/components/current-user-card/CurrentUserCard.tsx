import { useEffect, useState } from "react";

type CurrentUserProps = {
 _id: string;
 name: string;
 email: string;
}

const CurrentUserCard = () => {
 const [currentUser, setCurrentUser] = useState<CurrentUserProps>();

 const userId = localStorage.getItem('userId');

 useEffect(() => {
  async function getCurrentUser() {
   try {
    const response = await fetch(`http://localhost:5000/auth/user/${userId}`);
    const currentUser = await response.json();
    setCurrentUser(currentUser);
   } catch (error) {
    console.error('Error fetching current user:', error);
   }
  }

  getCurrentUser();
 }, []);

 console.log(currentUser)

 return (
  <div>Welcome {currentUser && currentUser.name}</div>
 );
}

export default CurrentUserCard;