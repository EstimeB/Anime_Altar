import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const PostForm = () => {
  const [postDescription, setPostDescription] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const { posts } = cache.readQuery({ query: QUERY_POSTS });

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [addPost, ...posts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, posts: [...me.posts, addPost] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // const { data } = 
      await addPost({
        variables: {
          postDescription,
          postTitle,
          postAuthor: Auth.getProfile().data.username,
        },
      });

      setPostDescription('');
      setPostTitle('');
    } catch (err) {
      console.error(err);
    }
  };
  const handleTitleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'postTitle') {
      setPostTitle(value);
    }
  };

  const handlePostChange = (event) => {
    const { name, value } = event.target;

    if (name === 'postDescription' && value.length <= 280) {
      setPostDescription(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3 style={styles.letstalk}>Let's talk anime!</h3>

      {Auth.loggedIn() ? (
        <>
        <div  style={styles.pfCard}>
            <p
              className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''
                }`}
            >
              Character Count: {characterCount}/280
            </p>
            <form
              onSubmit={handleFormSubmit}
            >
              <div style={styles.textBox}>
                <div style={styles.createPt}>Create New Post</div>
                <p style={styles.pS}>Post Title</p>
                <input style={styles.postT} placeholder="Post title..." name="postTitle" value={postTitle} onChange={handleTitleChange}>
                </input>
                <p style={styles.pS}>Post Description</p>
                <textarea
                  name="postDescription"
                  placeholder="Here's a new post..."
                  value={postDescription}
                  style={styles.postText}
                  onChange={handlePostChange}
                ></textarea>
                <br></br>
                <br></br>
                <div style={styles.btnDiv}><button style={styles.btn} type="submit">
                  Add Post
                </button></div>
              </div>
              {error && (
                <div>
                  {error.message}
                </div>
              )}
            </form>
          </div>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

const styles = {
  pfCard: {
    marginLeft: '20px',
    marginRight: '20px',
    boxShadow: '5px 5px 7px orange',
    marginBottom: '50px',
    height: '100%',
  },
  letstalk: {
    textAlign: 'center',
    paddingTop: '25px',
    fontSize: '30px',
  },
  textBox: {
    paddingTop: '20px',
    paddingBottom: '30px',
    // border: 'solid',
    marginLeft: '100px',
    marginRight: '100px',
  },
  postText: {
    width: '100%',
    height: '100px',
    background: 'beige',
  },
  postT: {
    width: '100%',
    marginBottom: '0px',
    height: '40px',
    background: 'beige',
  },
  btn: {
    // border: 'none',
    background: 'orange',
    width: '105px',
    height: '35px',
  },
  btnDiv: {
    textAlign: 'center',
  },
  pS: {
    fontSize: '20px',
    marginBottom: '5px',
  },
  createPt: {
    fontSize: '25px',
    textAlign: 'center',
  },
}

export default PostForm;
