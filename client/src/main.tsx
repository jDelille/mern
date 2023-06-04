import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import './scss/globals.scss';
import Signup from './components/auth/Signup.tsx';
import Login from './components/auth/Login.tsx';
import UserProfile from './pages/UserProfile.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <App />
      </div>
    ),
  },
  {
    path: "/signup",
    element: (
      <div>
        <Signup />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/user/:userId",
    element: (
      <div>
        <UserProfile />
      </div>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
