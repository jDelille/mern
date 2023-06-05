import Navbar from './components/navbar/Navbar';
import './App.scss'
import UserList from './components/user-list/UserList';
import PostFeed from './components/post-feed/PostFeed';

function App() {
  return (
    <div className='App'>
      {/* <Navbar /> */}
      <div className='column-main'>
        <PostFeed />
      </div>
    </div>
  )
}

export default App
