import React, { useEffect, useState } from 'react';
import CreatePostForm from '../createPostForm/createPostForm';
import Post from '../post/Post'
import './Feed.css'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if(token && (isUpdated || posts.length === 0)) {
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPosts(data.posts.reverse());
          setIsUpdated(false);
        })
    }
  }, [token, posts, isUpdated]);
  
    if(token) {
      return(
        <>
            <div className='post-title-div'>
          {/* <h2 className='post-title'>Posts</h2> */}
            <CreatePostForm callback={(value) => {
              setIsUpdated(value); 
            }}/>
          <div id='feed' role="feed">
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } /> )
              )}
          </div>
          </div>
        </>
      )
    } else {
      navigate('/login')
    }
}

export default Feed;