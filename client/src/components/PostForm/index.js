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
          // : Auth.getDashboard().data.username,
        },
      });

      setPostDescription('');
      setPostTitle('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'postDescription' && value.length <= 280) {
      setPostDescription(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div style={styles.theDiv}>
      <h3 style={styles.letstalk}>Let's talk anime!</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''
              }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            onSubmit={handleFormSubmit}
          >
            <div>
              <textarea
                name="postDescription"
                placeholder="Here's a new thought..."
                value={postDescription}
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div >
              <button type="submit">
                Add Post
              </button>
            </div>
            {error && (
              <div>
                {error.message}
              </div>
            )}
          </form>
        </>
      ) 
      : (
        <p>
          You need to be logged in to share your posts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

const styles = {
  theDiv: {
    textShadow: '5px 5px 7px rgb(151, 151, 143)',
  },
  letstalk: {
    textAlign: 'center',
    paddingTop: '25px',
    fontSize: '30px',

  }

}

export default PostForm;
