import React, { useState, useEffect } from 'react';
import CircleLoader from 'react-spinners/CircleLoader';
import axios from 'axios';
import Form from './components/Form';
import Post from './components/Post';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPosts();
  }, []);

  const url =
    'https://react-post-app-d2cbb-default-rtdb.europe-west1.firebasedatabase.app/post.json';

  const getPosts = () => {
    axios
      .get(url)
      .then((res) => {
        const rawUnsortedData = res.data;

        if (!rawUnsortedData) {
          setPosts([]);
          setLoading(false);
          return false;
        }

        const data = Object.entries(rawUnsortedData);
        data.map((el) => (el[1].date = Date.parse(el[1].date)));
        data.sort((a, b) => b[1].date - a[1].date);

        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (error) {
    return (
      <div>
        <p>This page cannot be loaded due to the following error:</p>
        <p>{error.message}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='loader-container'>
        <CircleLoader size={100} color='blue' />
      </div>
    );
  }

  const newPostHandler = (postTitle, postText) => {
    axios
      .post(url, {
        title: postTitle,
        body: postText,
        date: new Date(),
      })
      .then(() => {
        getPosts();
      });
  };

  const deletePostHandler = (postID) => {
    axios
      .delete(
        `https://react-post-app-d2cbb-default-rtdb.europe-west1.firebasedatabase.app/post/${postID}.json`
      )
      .then(() => {
        getPosts();
      });
  };

  return (
    <React.Fragment>
      <h1 className='heading'>REACT Post App</h1>

      <p className='json-info'>
        Raw JSON (hosted in a Firebase Realtime Database):
        <br />
        <a
          href='https://react-post-app-d2cbb-default-rtdb.europe-west1.firebasedatabase.app/post.json'
          target='_blank'
        >
          https://react-post-app-d2cbb-default-rtdb.europe-west1.firebasedatabase.app/post.json
        </a>
      </p>

      <Form onNewPostSubmit={newPostHandler} />

      {posts.length === 0 ? (
        <p className='json-info'>No posts!</p>
      ) : (
        <ul>
          {posts.map((el) => (
            <Post key={el[0]} post={el} onDelete={deletePostHandler} />
          ))}
        </ul>
      )}

      <footer className='footer'>
        <p>Coded by it-drafter</p>
        <p>March 2023.</p>
      </footer>
    </React.Fragment>
  );
};

export default App;
