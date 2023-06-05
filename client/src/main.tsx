import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import Signup from './components/auth/Signup.tsx';
import Login from './components/auth/Login.tsx';
import UserProfile from './pages/UserProfile.tsx';
import Users from './pages/Users.tsx';
import CreatePost from './pages/CreatePost.tsx';

import './scss/globals.scss';
import CurrentUserCard from './components/current-user-card/CurrentUserCard.tsx';
import LoginPage from './pages/auth/LoginPage.tsx';
import SignupPage from './pages/auth/SignupPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <App />
      </div>
    ),
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/users',
    element: (
      <div>
        <Users />
      </div>
    ),
  },
  {
    path: '/create-post',
    element: (
      <div>
        <CreatePost />
      </div>
    ),
  },
  {
    path: '/user/:userId',
    element: (
      <div>
        <UserProfile />
      </div>
    ),
  },
  {
    path: 'about',
    element: <div>About</div>,
  },
]);

const shouldRenderColumns = (path: string) => {
  return !['/signup', '/login'].includes(path);
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className='ui'>
    {shouldRenderColumns(window.location.pathname) ? (
      <div className='columns'>
        <div className='column-left'>
          <CurrentUserCard />
        </div>
        <RouterProvider router={router} />
      </div>
    ) : (
      <RouterProvider router={router} />
    )}
  </div>
);