import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

const CommentForm = ({ postId }) => {
  const [commentDescription, setCommentDescription] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
    //   const { data } =
       await addComment({
        variables: {
          postId,
          commentDescription,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentDescription' && value.length <= 280) {
      setCommentDescription(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4>What are your thoughts on this thought?</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span>{error.message}</span>}
          </p>
          <form
            onSubmit={handleFormSubmit}
          >
            <div>
              <textarea
                name="commentDescription"
                placeholder="Add your comment..."
                value={commentDescription}              
               
                onChange={handleChange}
              ></textarea>
            </div>

            <div>
              <button type="submit">
                Add Comment
              </button>
            </div>
          </form>
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

export default CommentForm;